package com.app.starter1.persistence.services;

import com.app.starter1.persistence.entity.Contrato;
import com.app.starter1.persistence.entity.Customer;
import com.app.starter1.persistence.entity.Product;
import com.app.starter1.persistence.exeptions.ProductNotFoundException;
import com.app.starter1.persistence.repository.ContratoRepository;
import com.app.starter1.persistence.repository.CustomerRepository;
import com.app.starter1.persistence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Contract;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ContratoRepository contratoRepository;


    /**
     * Obtiene los productos asociados a un cliente dado.
     *
     * @param customerId ID del cliente
     * @return Lista de productos asociados al cliente
     */
    public List<Product> getProductsByCustomer(Long customerId) {
        return productRepository.findByCustomer(customerId);
    }

    /**
     * Guarda un producto y actualiza su relación con el contrato asociado al cliente.
     *
     * @param producto Producto a guardar
     * @param clienteId ID del cliente asociado al producto
     * @return Producto guardado
     */
    public Product guardarProductoConContrato(Product producto, Long clienteId) {
        // Guardar el producto en la base de datos

        // Establecer el ID del cliente en el campo customer del producto
        //producto.setCustomer(clienteId.toString());
        System.out.println("customer "+clienteId);

        // Guardar el producto en la base de datos
        Product productoGuardado = productRepository.save(producto);

        // Buscar al cliente por su ID
        Customer cliente = customerRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // Buscar el contrato del cliente
        Contrato contrato = contratoRepository.findByCliente(cliente)
                .orElseThrow(() -> new RuntimeException("Contrato no encontrado para el cliente"));

        // Actualizar la relación entre contrato y producto
        contrato.getProductContractList().add(productoGuardado);
        contratoRepository.save(contrato);

        return productoGuardado;
    }

    /**
     * Actualiza los datos de un producto existente.
     *
     * @param productId ID del producto a actualizar
     * @param updatedProduct Datos actualizados del producto
     * @return Producto actualizado
     */
    public Product actualizarProducto(Long productId, Product updatedProduct) {
        // Buscar el producto existente por su ID
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto con ID " + productId + " no encontrado"));

        // Actualizar los campos del producto
        existingProduct.setProductType(updatedProduct.getProductType());
        existingProduct.setProductCode(updatedProduct.getProductCode());
        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setBrand(updatedProduct.getBrand());
        existingProduct.setModel(updatedProduct.getModel());
        existingProduct.setLicensePlate(updatedProduct.getLicensePlate());
        existingProduct.setProductClass(updatedProduct.getProductClass());
        existingProduct.setClassification(updatedProduct.getClassification());
        existingProduct.setStatus(updatedProduct.getStatus());
        existingProduct.setDateAdded(updatedProduct.getDateAdded());
        existingProduct.setInvimaRegister(updatedProduct.getInvimaRegister());
        existingProduct.setOrigin(updatedProduct.getOrigin());
        existingProduct.setVoltage(updatedProduct.getVoltage());
        existingProduct.setPower(updatedProduct.getPower());
        existingProduct.setFrequency(updatedProduct.getFrequency());
        existingProduct.setAmperage(updatedProduct.getAmperage());
        existingProduct.setPurchaseDate(updatedProduct.getPurchaseDate());
        existingProduct.setBookValue(updatedProduct.getBookValue());
        existingProduct.setSupplier(updatedProduct.getSupplier());
        existingProduct.setWarranty(updatedProduct.getWarranty());
        existingProduct.setWarrantyStartDate(updatedProduct.getWarrantyStartDate());
        existingProduct.setWarrantyEndDate(updatedProduct.getWarrantyEndDate());
        existingProduct.setManual(updatedProduct.getManual());
        existingProduct.setPeriodicity(updatedProduct.getPeriodicity());
        existingProduct.setLocation(updatedProduct.getLocation());
        existingProduct.setPlacement(updatedProduct.getPlacement());

        // Guardar el producto actualizado
        return productRepository.save(existingProduct);
    }

}
