package com.app.starter1.persistence.repository;

import com.app.starter1.persistence.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    // Métodos personalizados si los necesitas, por ejemplo:
    // List<Image> findByEquipment(String equipment);
}
