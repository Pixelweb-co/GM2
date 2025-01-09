package com.app.starter1.persistence.repository;

import com.app.starter1.persistence.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByEquipment(String string);
    // Métodos personalizados si los necesitas, por ejemplo:
    // List<Image> findByEquipment(String equipment);
}
