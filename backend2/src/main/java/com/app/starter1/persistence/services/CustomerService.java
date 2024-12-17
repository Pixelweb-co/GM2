package com.app.starter1.persistence.services;

import com.app.starter1.dto.CustomerDTO;
import com.app.starter1.persistence.entity.Customer;
import com.app.starter1.persistence.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Crear o actualizar un cliente
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomersWithContracts() {
        return customerRepository.findAll();
    }

    // Buscar cliente por ID
    public CustomerDTO findById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return mapToDTO(customer);
    }

    // Eliminar cliente por ID
    public void deleteById(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        customerRepository.deleteById(id);
    }

    // Método para obtener la entidad de un cliente por ID
    public Customer findEntityById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    // Método para actualizar cliente desde un DTO
    public void updateEntityFromDTO(Customer customer, CustomerDTO customerDTO) {
        if (customerDTO.getName() != null) {
            customer.setName(customerDTO.getName());
        }
        if (customerDTO.getNit() != null) {
            customer.setNit(customerDTO.getNit());
        }
        if (customerDTO.getPhone() != null) {
            customer.setPhone(customerDTO.getPhone());
        }
        if (customerDTO.getEmail() != null) {
            customer.setEmail(customerDTO.getEmail());
        }
        if (customerDTO.getAddress() != null) {
            customer.setAddress(customerDTO.getAddress());
        }
        if (customerDTO.getContact() != null) {
            customer.setContact(customerDTO.getContact());
        }
        if (customerDTO.getPosition() != null) {
            customer.setPosition(customerDTO.getPosition());
        }
        if (customerDTO.getType() != null) {
            customer.setType(customerDTO.getType());
        }
        if (customerDTO.getStatus() != null) {
            customer.setStatus(customerDTO.getStatus());
        }
        if (customerDTO.getDateRegister() != null) {
            customer.setDateRegister(customerDTO.getDateRegister());
        }
    }

    // Método para mapear entidad a DTO
    public CustomerDTO mapToDTO(Customer customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getName(),
                customer.getNit(),
                customer.getPhone(),
                customer.getEmail(),
                customer.getAddress(),
                customer.getContact(),
                customer.getPosition(),
                customer.getType(),
                customer.getStatus(),
                customer.getDateRegister()
        );
    }

    // Método para convertir DTO a entidad
    public Customer mapToEntity(CustomerDTO customerDTO) {
        return Customer.builder()
                .id(customerDTO.getId())
                .name(customerDTO.getName())
                .nit(customerDTO.getNit())
                .phone(customerDTO.getPhone())
                .email(customerDTO.getEmail())
                .address(customerDTO.getAddress())
                .contact(customerDTO.getContact())
                .position(customerDTO.getPosition())
                .type(customerDTO.getType())
                .status(customerDTO.getStatus())
                .dateRegister(customerDTO.getDateRegister())
                .build();
    }
}
