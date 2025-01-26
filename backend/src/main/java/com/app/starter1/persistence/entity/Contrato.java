package com.app.starter1.persistence.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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


    @Column(name = "fecha_inicio", nullable = true)
    private LocalDate fechaInicio;

    @Column(name = "fecha_final", nullable = true)
    private LocalDate fechaFinal;

    @Column(name = "numero", nullable = true)
    private String numero;


    @Column(name = "descripcion", nullable = true)
    private String descripcionContrato;

    @Column(name = "estado", nullable = false)
    private String estado;

    @OneToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private Customer cliente;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "equipos_contrato",
            joinColumns = @JoinColumn(name = "id_contrato"), // Se refiere a la columna de la tabla Contrato
            inverseJoinColumns = @JoinColumn(name = "id_producto")) // Se refiere a la columna de la tabla Product
    private Set<Product> productContractList = new HashSet<>();


}
