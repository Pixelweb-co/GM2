package com.app.starter1.controllers;

import com.app.starter1.dto.SolicitudDTO;
import com.app.starter1.dto.SolicitudResponseDTO;
import com.app.starter1.persistence.entity.Solicitud;
import com.app.starter1.persistence.services.SolicitudService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/solicitudes")
@RequiredArgsConstructor
public class SolicitudController {

    private final SolicitudService solicitudService;

    @Transactional
    @GetMapping
    public ResponseEntity<List<SolicitudResponseDTO>> getAllSolicitudes() {
        List<SolicitudResponseDTO> solicitudes = solicitudService.getSolicitudes();
        return ResponseEntity.ok(solicitudes);
    }

    @Transactional
    @PostMapping
    public ResponseEntity<List<Solicitud>> createSolicitud(@RequestBody SolicitudDTO solicitudDTO) {
        List<Solicitud> createdSolicitudes = solicitudService.createSolicitudes(solicitudDTO);
        return ResponseEntity.ok(createdSolicitudes);
    }

    @Transactional
    @GetMapping("/worklist/{id_usuario}")
    public ResponseEntity<List<SolicitudResponseDTO>> getSolicitudesAbiertas(@PathVariable Long id_usuario) {
        List<SolicitudResponseDTO> solicitudesAbiertas = solicitudService.getSolicitudesAbiertasPorUsuario(id_usuario);
        return ResponseEntity.ok(solicitudesAbiertas);
    }

    // Endpoint para obtener solicitudes abiertas para el usuario con fecha de hoy
    @GetMapping("/worklist/today/{userId}")
    public ResponseEntity<List<SolicitudResponseDTO>> getSolicitudesHoy(@PathVariable Long userId) {
        // Obtén la fecha de hoy en formato String (asegúrate de que coincida con el formato de tu base de datos)
        String fechaHoy = LocalDate.now().toString(); // "yyyy-MM-dd"

        // Llama al servicio para obtener las solicitudes filtradas
        List<SolicitudResponseDTO> solicitudes = solicitudService.getSolicitudesHoy(userId, fechaHoy);
        return ResponseEntity.ok(solicitudes);
    }


}
