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
@Table(name = "tipo_servicio")
@Data
@Builder
@Getter
@Setter
public class TipoServicio {

    @Id
    @Column(name = "id_tipo_servicio")
    private Integer id;

    @Column(name = "desc_tipo_servicio")
    private String descripcion;
}

