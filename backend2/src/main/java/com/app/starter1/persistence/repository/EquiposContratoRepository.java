package com.app.starter1.persistence.repository;

import com.app.starter1.persistence.entity.EquipoContrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquiposContratoRepository extends JpaRepository<EquipoContrato, Long> {
}