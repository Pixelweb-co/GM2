package com.app.starter1.persistence.services;

import com.app.starter1.dto.CustomerDTO;
import com.app.starter1.persistence.entity.Contrato;
import com.app.starter1.persistence.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    @Autowired
    private ContratoRepository contratoRepository;

    // Método para guardar contratos
    public Contrato save(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    // Método para actualizar un contrato existente
    public Contrato updateEntityFromDTO(Contrato existingContract, CustomerDTO customerDTO) {
        if (customerDTO.getFechaInicio() != null) {
            existingContract.setFechaInicio(customerDTO.getFechaInicio());
        }
        if (customerDTO.getFechaFinal() != null) {
            existingContract.setFechaFinal(customerDTO.getFechaFinal());
        }
        if (customerDTO.getDescripcionContrato() != null) {
            existingContract.setDescripcion(customerDTO.getDescripcionContrato());
        }

        // Aquí podrías agregar más lógica según sea necesario

        return contratoRepository.save(existingContract);
    }

    // Método para obtener un contrato por su ID
    public Contrato findById(Long id) {
        return contratoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contrato not found"));
    }

    // Método para eliminar un contrato por su ID
    public void deleteById(Long id) {
        if (!contratoRepository.existsById(id)) {
            throw new RuntimeException("Contrato not found");
        }
        contratoRepository.deleteById(id);
    }

    // Método para obtener todos los contratos
    public List<Contrato> findAll() {
        return contratoRepository.findAll();
    }

    // Método para eliminar todos los contratos
    public void deleteAll() {
        contratoRepository.deleteAll();
    }
}


