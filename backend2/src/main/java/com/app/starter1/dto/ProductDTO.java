package com.app.starter1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data  // Esta anotación genera los getters, setters, toString, equals y hashCode automáticamente
@NoArgsConstructor
@AllArgsConstructor

public class ProductDTO {

    private Long id;
    private String productType;
    private String productCode;
    private String productName;
    private String brand;
    private String model;
    private String licensePlate;
    private String productClass;
    private String classification;
    private Long clientId;  // Asumo que este es el ID del cliente relacionado
    private String status;
    private LocalDate dateAdded;
    private String invimaRegister;
    private String origin;
    private String voltage;
    private String power;
    private String frequency;
    private String amperage;
    private LocalDate purchaseDate;
    private Integer bookValue;
    private String supplier;
    private String warranty;
    private LocalDate warrantyStartDate;
    private LocalDate warrantyEndDate;
    private String manual;
    private String periodicity;
    private String location;
    private String placement;

    // Lombok generará los getters y setters automáticamente
}
