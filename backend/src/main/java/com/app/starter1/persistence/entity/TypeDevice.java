package com.app.starter1.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "type_device")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TypeDevice {
    @Id
    @Column(name = "id_type_device")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_device")
    private String typeDevice;

    @ManyToOne
    @JoinColumn(name = "id_plantilla", referencedColumnName = "id_plantilla")
    private PlantillaVerificacion plantillaVerificacion;
}
