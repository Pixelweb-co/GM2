package com.app.starter1.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class TypeDeviceDTO {
    private Long id;
    private String typeDevice;


    // Constructor con todos los campos
    public TypeDeviceDTO(Long id, String typeDevice) {
        this.id = id;
        this.typeDevice = typeDevice;

    }


}
