package com.app.starter1.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TypeServiceDTO {
    private Long id;
    private String typeService;


    // Constructor con todos los campos
    public TypeServiceDTO(Long id, String typeService) {
        this.id = id;
        this.typeService = typeService;

    }


}
