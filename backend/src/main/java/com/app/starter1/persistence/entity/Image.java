package com.app.starter1.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "equipment", length = 20)
    private String equipment;

    @Column(name = "name", length = 80)
    private String name;

    @Column(name = "date", length = 10)
    private String date;

    @Column(name = "hour", length = 10)
    private String hour;
}

