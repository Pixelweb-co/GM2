package com.app.starter1.controllers;

import com.app.starter1.dto.SolicitudDTO;
import com.app.starter1.persistence.entity.Solicitud;
import com.app.starter1.persistence.services.SolicitudService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/solicitudes")
@RequiredArgsConstructor
public class SolicitudController {

    private final SolicitudService solicitudService;

    @GetMapping
    public ResponseEntity<List<SolicitudDTO>> getSolicitudes() {
        List<SolicitudDTO> solicitudes = solicitudService.getSolicitudes();
        return ResponseEntity.ok(solicitudes);
    }
}
