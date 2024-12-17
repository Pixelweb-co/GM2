package com.app.starter1.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Entity
@Table(name = "customers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_cliente", nullable = false)
    private String name;

    @Column(name = "identificacion_cliente", unique = false, nullable = true)
    private String nit;

    @Column(name = "telefono_cliente", nullable = true)
    private String phone;

    @Column(name = "email_cliente", nullable = true)
    private String email;

    @Column(name = "direccion_cliente", nullable = true)
    private String address;

    @Column(name = "contacto_cliente", nullable = true)
    private String contact;

    @Column(name = "cargo_cliente", nullable = true)
    private String position;

    @Column(name = "tipo_entidad", nullable = true)
    private String type;

    @Column(name = "status_cliente")
    private String status;

    @Column(name = "date_added", nullable = true, updatable = false)
    private LocalDate dateRegister;

    @PrePersist
    public void prePersist() {
        if (this.dateRegister == null) {
            this.dateRegister = LocalDate.now();
        }
    }

    // Relación OneToOne con Contrato
    @OneToOne(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Contrato contrato;

}

