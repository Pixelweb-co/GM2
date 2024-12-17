package com.app.starter1.persistence.services;

import com.app.starter1.dto.SolicitudDTO;
import com.app.starter1.persistence.repository.SolicitudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitudService {

    @Autowired
    private final SolicitudRepository solicitudRepository;

    public List<SolicitudDTO> getSolicitudes() {
        return solicitudRepository.findAllSolicitudes();
    }

}

