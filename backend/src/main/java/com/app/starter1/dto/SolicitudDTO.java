package com.app.starter1.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SolicitudDTO {
    private Long idSolicitud;
    private String fecha;
    private String hora;
    private String usuario;
    private String estado;
    private String equipo;
    private String entidad;
    private String tipoServicio;
}

