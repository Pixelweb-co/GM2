package com.app.starter1.dto;

import lombok.Data;
import java.util.List;

@Data
public class PlantillaRequest {
    private String marca;
    private String modelo;
    private Long tipoElement;
    private List<Campo> campos;

    @Data
    public static class Campo {
        private String nom;
        private Long tipo;
    }
}

