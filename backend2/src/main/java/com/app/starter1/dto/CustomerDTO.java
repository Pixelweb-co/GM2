package com.app.starter1.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private Long id;
    private String name;
    private String nit;
    private String phone;
    private String email;
    private String address;
    private String contact;
    private String position;
    private String type;
    private String status;
    private LocalDate dateRegister; // Cambiado a LocalDate

    // Campos adicionales para la creación del contrato
    private LocalDate fechaInicio;
    private LocalDate fechaFinal;
    private String descripcionContrato;


    public CustomerDTO(Long id, String name, String nit, String phone, String email, String address, String contact, String position, String type, String status, LocalDate dateRegister) {
    }
}
