package com.app.starter1.persistence.services;

import com.app.starter1.persistence.entity.Plantilla;
import com.app.starter1.persistence.repository.PlantillaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlantillaService {

    @Autowired
    private PlantillaRepository plantillaRepository;

    // Obtener todas las plantillas
    public List<Plantilla> obtenerTodasLasPlantillas() {
        return plantillaRepository.findAll();
    }

    // Obtener una plantilla por su ID
    public Optional<Plantilla> obtenerPlantillaPorId(Long id) {
        return plantillaRepository.findById(id);
    }

    // Crear o actualizar una plantilla
    public Plantilla guardarPlantilla(Plantilla plantilla) {
        return plantillaRepository.save(plantilla);
    }

    // Eliminar una plantilla por su ID
    public void eliminarPlantilla(Long id) {
        plantillaRepository.deleteById(id);
    }
}
