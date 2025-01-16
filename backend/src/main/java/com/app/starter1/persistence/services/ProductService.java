package com.app.starter1.persistence.services;

import com.app.starter1.persistence.entity.Contrato;
import com.app.starter1.persistence.entity.Customer;
import com.app.starter1.persistence.entity.Image;
import com.app.starter1.persistence.entity.Product;
import com.app.starter1.persistence.exeptions.ProductNotFoundException;
import com.app.starter1.persistence.repository.ContratoRepository;
import com.app.starter1.persistence.repository.CustomerRepository;
import com.app.starter1.persistence.repository.ImageRepository;
import com.app.starter1.persistence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Contract;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    // Inyectar el repositorio de imágenes
    @Autowired
    private ImageRepository imageRepository;

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
        Product productoGuardado = productRepository.save(producto);

        // Manejar la relación con el contrato como antes
        Customer cliente = customerRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Contrato contrato = contratoRepository.findByCliente(cliente)
                .orElseThrow(() -> new RuntimeException("Contrato no encontrado para el cliente"));

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


        existingProduct.setImage(updatedProduct.getImage());

       

        // Guardar el producto actualizado
        return productRepository.save(existingProduct);
    }

    private void eliminarImagen(Image imagen) {
        try {
            // Eliminar la imagen del sistema de archivos
            Path filePath = Paths.get("uploads/images/" + imagen.getName());
            Files.deleteIfExists(filePath);

            // Eliminar la imagen de la base de datos
            imageRepository.delete(imagen);
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar la imagen: " + e.getMessage(), e);
        }
    }


}
