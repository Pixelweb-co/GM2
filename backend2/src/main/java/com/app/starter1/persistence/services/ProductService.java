package com.app.starter1.persistence.services;

import com.app.starter1.dto.ProductDTO;
import com.app.starter1.persistence.entity.Product;
import com.app.starter1.persistence.entity.Customer;
import com.app.starter1.persistence.exeptions.ProductNotFoundException;
import com.app.starter1.persistence.repository.ProductRepository;
import com.app.starter1.persistence.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // Crear o actualizar un producto
    public Product save(Product product) {
        return productRepository.save(product);
    }

    // Obtener todos los productos como DTOs
    public List<ProductDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Buscar producto por ID
    public ProductDTO findById(Long id) {
        return productRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
    }

    // Buscar entidad Producto por ID
    public Product findEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
    }

    // Eliminar producto por ID
    public void deleteById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    // Asignar un producto a un cliente
    public Product assignToCustomer(Long productId, Long customerId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        product.setClient(customer);
        return productRepository.save(product);
    }

    // Método para mapear entidad a DTO
    public ProductDTO mapToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getProductType(),
                product.getProductCode(),
                product.getProductName(),
                product.getBrand(),
                product.getModel(),
                product.getLicensePlate(),
                product.getProductClass(),
                product.getClassification(),
                product.getClient() != null ? product.getClient().getId() : null,
                product.getStatus(),
                product.getDateAdded(),
                product.getInvimaRegister(),
                product.getOrigin(),
                product.getVoltage(),
                product.getPower(),
                product.getFrequency(),
                product.getAmperage(),
                product.getPurchaseDate(),
                product.getBookValue(),
                product.getSupplier(),
                product.getWarranty(),
                product.getWarrantyStartDate(),
                product.getWarrantyEndDate(),
                product.getManual(),
                product.getPeriodicity(),
                product.getLocation(),
                product.getPlacement()
        );
    }

    // Método para convertir DTO a entidad
    public Product mapToEntity(ProductDTO productDTO) {
        Product product = Product.builder()
                .id(productDTO.getId())
                .productType(productDTO.getProductType())
                .productCode(productDTO.getProductCode())
                .productName(productDTO.getProductName())
                .brand(productDTO.getBrand())
                .model(productDTO.getModel())
                .licensePlate(productDTO.getLicensePlate())
                .productClass(productDTO.getProductClass())
                .classification(productDTO.getClassification())
                .status(productDTO.getStatus())
                .dateAdded(productDTO.getDateAdded())
                .invimaRegister(productDTO.getInvimaRegister())
                .origin(productDTO.getOrigin())
                .voltage(productDTO.getVoltage())
                .power(productDTO.getPower())
                .frequency(productDTO.getFrequency())
                .amperage(productDTO.getAmperage())
                .purchaseDate(productDTO.getPurchaseDate())
                .bookValue(productDTO.getBookValue())
                .supplier(productDTO.getSupplier())
                .warranty(productDTO.getWarranty())
                .warrantyStartDate(productDTO.getWarrantyStartDate())
                .warrantyEndDate(productDTO.getWarrantyEndDate())
                .manual(productDTO.getManual())
                .periodicity(productDTO.getPeriodicity())
                .location(productDTO.getLocation())
                .placement(productDTO.getPlacement())
                .build();

        if (productDTO.getClientId() != null) {
            Customer customer = customerRepository.findById(productDTO.getClientId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            product.setClient(customer);
        }

        return product;
    }

    // Método para actualizar entidad desde DTO
    public void updateEntityFromDTO(Product existingProduct, ProductDTO productDTO) {
        existingProduct.setProductType(productDTO.getProductType());
        existingProduct.setProductCode(productDTO.getProductCode());
        existingProduct.setProductName(productDTO.getProductName());
        existingProduct.setBrand(productDTO.getBrand());
        existingProduct.setModel(productDTO.getModel());
        existingProduct.setLicensePlate(productDTO.getLicensePlate());
        existingProduct.setProductClass(productDTO.getProductClass());
        existingProduct.setClassification(productDTO.getClassification());
        existingProduct.setStatus(productDTO.getStatus());
        existingProduct.setDateAdded(productDTO.getDateAdded());
        existingProduct.setInvimaRegister(productDTO.getInvimaRegister());
        existingProduct.setOrigin(productDTO.getOrigin());
        existingProduct.setVoltage(productDTO.getVoltage());
        existingProduct.setPower(productDTO.getPower());
        existingProduct.setFrequency(productDTO.getFrequency());
        existingProduct.setAmperage(productDTO.getAmperage());
        existingProduct.setPurchaseDate(productDTO.getPurchaseDate());
        existingProduct.setBookValue(productDTO.getBookValue());
        existingProduct.setSupplier(productDTO.getSupplier());
        existingProduct.setWarranty(productDTO.getWarranty());
        existingProduct.setWarrantyStartDate(productDTO.getWarrantyStartDate());
        existingProduct.setWarrantyEndDate(productDTO.getWarrantyEndDate());
        existingProduct.setManual(productDTO.getManual());
        existingProduct.setPeriodicity(productDTO.getPeriodicity());
        existingProduct.setLocation(productDTO.getLocation());
        existingProduct.setPlacement(productDTO.getPlacement());

        if (productDTO.getClientId() != null) {
            Customer customer = customerRepository.findById(productDTO.getClientId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            existingProduct.setClient(customer);
        } else {
            existingProduct.setClient(null);
        }
    }

    // Obtener productos con clientes
    public List<ProductDTO> getProductosConClientes() {
        List<Product> products = productRepository.findAllProductosWithClienteInfo();
        return products.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
}
