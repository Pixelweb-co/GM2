package com.app.starter1.persistence.repository;

import com.app.starter1.dto.ProductDTO;
import com.app.starter1.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStatus(String status); // Filtrar productos por estado
    List<Product> findByProductNameContaining(String keyword); // Buscar productos por nombre parcial

    @Query("SELECT p FROM Product p JOIN FETCH p.client")  // Utiliza JOIN FETCH para evitar LazyLoading
    List<Product> findAllProductosWithClienteInfo();
}