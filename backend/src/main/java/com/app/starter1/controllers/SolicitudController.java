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
}
