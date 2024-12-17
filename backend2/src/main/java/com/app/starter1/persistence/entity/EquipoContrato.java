package com.app.starter1.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "equipos_contrato")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EquipoContrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "id_contrato", nullable = false)
    private Long idContrato;

    @Column(name = "id_equipo", nullable = true)
    private Long idEquipo;

    @Column(name = "id_cliente", nullable = true)
    private Long idCliente;

    @Column(name = "status", nullable = true)
    private Integer status;
}
