package com.app.starter1.controllers;


import com.app.starter1.dto.DocumentRequest;
import com.app.starter1.persistence.entity.Document;
import com.app.starter1.persistence.repository.DocumentRepository;
import com.app.starter1.persistence.services.DocumentStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    DocumentStorageService documentStorageService;

    @Autowired
    DocumentRepository documentRepository;

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            // Cargar el archivo como recurso
            Resource file = documentStorageService.LoadAsResource(filename);

            // Verificar si el archivo existe
            if (file == null || !file.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Archivo no encontrado: " + filename);
            }

            // Determinar el tipo de contenido
            String contentType = Files.probeContentType(file.getFile().toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // Responder con el archivo y su tipo de contenido
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(file);

        } catch (NoSuchFileException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Archivo no encontrado: " + filename, e);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al cargar el archivo: " + filename, e);
        }
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<List<Document>> saveDocument(DocumentRequest documentRequest)  {


        String path = documentStorageService.Store(documentRequest.getFile());
        Document document = new Document();
        // Establecer la fecha formateada
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MM-dd-yy");
        String formattedDate = LocalDate.now().format(dateFormatter);

        // Establecer la hora formateada
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String formattedTime = LocalTime.now().format(timeFormatter);

        document.setDate(formattedDate);  // Fecha formateada en MM-dd-yy
        document.setHour(formattedTime);  // Hora formateada en HH:mm:ss
        document.setTag(documentRequest.getTag());
        document.setName(path);
        document.setEnabled(1);
        document.setReport(documentRequest.isReport());
        document.setEquipment(documentRequest.getProduct_id());
        Document saved = documentRepository.save(document);

        List<Document> documents = documentRepository.findByEquipment(documentRequest.getProduct_id());

        if (documents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(documents);
        }

        return ResponseEntity.ok(documents);


    }
}
