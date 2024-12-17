package com.app.starter1.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "contratacion")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_final", nullable = false)
    private LocalDate fechaFinal;

    @Column(name = "descripcion", nullable = true)
    private String descripcion;

    @Column(name = "estado", nullable = false)
    private Integer estado;

    @OneToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "id", nullable = false)
    private Customer cliente;
}
