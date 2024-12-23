package com.app.starter1.persistence.repository;

import com.app.starter1.persistence.entity.Plantilla;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface PlantillaRepository extends JpaRepository<Plantilla, Long> {
        // Aquí puedes agregar métodos personalizados si lo necesitas
    }


