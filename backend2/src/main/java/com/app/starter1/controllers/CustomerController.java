package com.app.starter1.controllers;

import com.app.starter1.dto.CustomerDTO;
import com.app.starter1.persistence.entity.Contrato;
import com.app.starter1.persistence.entity.Customer;
import com.app.starter1.persistence.services.ContractService;
import com.app.starter1.persistence.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ContractService contractService;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomersWithContracts() {
        List<Customer> customers = customerService.getAllCustomersWithContracts();
        return ResponseEntity.ok(customers);
    }

    // Obtener cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        CustomerDTO customer = customerService.findById(id);
        return ResponseEntity.ok(customer);
    }

    // Crear un nuevo cliente
    @PostMapping
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {
        Customer customer = customerService.mapToEntity(customerDTO);
        Customer savedCustomer = customerService.save(customer);

        // Crear un contrato solo si los campos relevantes están presentes
        if (customerDTO.getFechaInicio() != null && customerDTO.getFechaFinal() != null) {
            Contrato contract = new Contrato();
            contract.setCliente(savedCustomer);
            contract.setFechaInicio(customerDTO.getFechaInicio());
            contract.setFechaFinal(customerDTO.getFechaFinal());
            contract.setDescripcion(customerDTO.getDescripcionContrato());
            contract.setEstado(1); // Estado activo, ajusta según tu lógica

            // Guardar el contrato
            contractService.save(contract);
        }

        return ResponseEntity.ok(customerService.mapToDTO(savedCustomer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO) {
        // Obtener cliente existente
        Customer existingCustomer = customerService.findEntityById(id);

        // Actualizar cliente con los datos del DTO
        customerService.updateEntityFromDTO(existingCustomer, customerDTO);

        // Si el cliente tiene un contrato asociado, actualizarlo
        if (existingCustomer.getContrato() != null) {
            Contrato existingContract = existingCustomer.getContrato();

            // Verificar si hay cambios en los datos del contrato
            existingContract = contractService.updateEntityFromDTO(existingContract, customerDTO);
        }

        // Guardar cliente actualizado
        Customer updatedCustomer = customerService.save(existingCustomer);

        return ResponseEntity.ok(customerService.mapToDTO(updatedCustomer));
    }

}
