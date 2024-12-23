package com.app.starter1.controllers;

import com.app.starter1.persistence.entity.Plantilla;
import com.app.starter1.persistence.services.PlantillaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/plantillas")
public class PlantillaController {

    @Autowired
    private PlantillaService plantillaService;

    // Obtener todas las plantillas
    @GetMapping
    public List<Plantilla> obtenerTodasLasPlantillas() {
        return plantillaService.obtenerTodasLasPlantillas();
    }

    // Obtener plantilla por ID
    @GetMapping("/{id}")
    public ResponseEntity<Plantilla> obtenerPlantillaPorId(@PathVariable Long id) {
        Optional<Plantilla> plantilla = plantillaService.obtenerPlantillaPorId(id);
        return plantilla.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear o actualizar una plantilla
    @PostMapping
    public ResponseEntity<Plantilla> guardarPlantilla(@RequestBody Plantilla plantilla) {
        Plantilla plantillaGuardada = plantillaService.guardarPlantilla(plantilla);
        return new ResponseEntity<>(plantillaGuardada, HttpStatus.CREATED);
    }

    // Eliminar plantilla por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPlantilla(@PathVariable Long id) {
        plantillaService.eliminarPlantilla(id);
        return ResponseEntity.noContent().build();
    }
}
