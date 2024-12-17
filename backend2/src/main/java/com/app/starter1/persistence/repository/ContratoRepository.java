package com.app.starter1.persistence.repository;

import com.app.starter1.persistence.entity.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {

    Optional<Contrato> findByClienteId(Long id);  // Busca por el ID del cliente
}
