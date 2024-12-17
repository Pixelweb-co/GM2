package com.app.starter1.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "estado_solicitud")
@Data
@Builder
@Getter
@Setter
public class EstadoSolicitud {

    @Id
    @Column(name = "id_estado_sol")
    private Integer id;

    @Column(name = "desc_estado_sol")
    private String descripcion;
}