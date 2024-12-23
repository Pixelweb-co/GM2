package com.app.starter1.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class SolicitudResponseDTO {
    private Long idSolicitud;
    private String fecha;
    private String hora;
    private String nombreEquipo;
    private String nombreTipoServicio;
    private String nombreEntidad;
    private String nombreEstadoSolicitud;
    private Long asig;
    private String status;
    private Long idEquipo;
    private Long entidad;
    private Long tipoServicio;
    private String desc;
}
