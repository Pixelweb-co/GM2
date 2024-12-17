package com.app.starter1.controllers;

import com.app.starter1.dto.ProductoRequest;
import com.app.starter1.persistence.entity.Customer;
import com.app.starter1.persistence.entity.Product;
import com.app.starter1.persistence.repository.ProductRepository;
import com.app.starter1.persistence.services.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @GetMapping
    @Transactional
    // Obtener todos los products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Product> crearProducto(@RequestBody ProductoRequest productoRequest) {
        Product producto = convertirAEntidad(productoRequest);

        Product productoGuardado = productService.guardarProductoConContrato(producto, productoRequest.getClient());
        return ResponseEntity.status(HttpStatus.CREATED).body(productoGuardado);
    }

    private Product convertirAEntidad(ProductoRequest productoRequest) {
        return Product.builder()
                .placement(productoRequest.getPlacement())
                .location(productoRequest.getLocation())
                .periodicity(productoRequest.getPeriodicity())
                .manual(productoRequest.getManual())
                .warrantyStartDate(LocalDate.parse(productoRequest.getWarrantyStartDate()))
                .warrantyEndDate(LocalDate.parse(productoRequest.getWarrantyEndDate()))
                .supplier(productoRequest.getSupplier())
                .bookValue(productoRequest.getBookValue())
                .purchaseDate(LocalDate.parse(productoRequest.getPurchaseDate()))
                .amperage(productoRequest.getAmperage())
                .frequency(productoRequest.getFrequency())
                .power(productoRequest.getPower())
                .voltage(productoRequest.getVoltage())
                .origin(productoRequest.getOrigin())
                .invimaRegister(productoRequest.getInvimaRegister())
                .status(productoRequest.getStatus())
                .licensePlate(productoRequest.getLicensePlate())
                .model(productoRequest.getModel())
                .brand(productoRequest.getBrand())
                .productName(productoRequest.getProductName())
                .productCode(productoRequest.getProductCode())
                .productType(productoRequest.getTypeDevice())
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> actualizarProducto(
            @PathVariable Long id,
            @RequestBody Product product) {
        Product updatedProduct = productService.actualizarProducto(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

}
