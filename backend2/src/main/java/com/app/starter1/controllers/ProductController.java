package com.app.starter1.controllers;

import com.app.starter1.dto.ProductDTO;
import com.app.starter1.persistence.entity.Product;
import com.app.starter1.persistence.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.findAll();
        return ResponseEntity.ok(products);
    }
    //productos con cliente
    @GetMapping
    public ResponseEntity<List<ProductDTO>> listarProductosConClientes() {
        List<ProductDTO> productos = productService.getProductosConClientes();
        return ResponseEntity.ok(productos);
    }

    // Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    // Crear un nuevo producto
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        Product product = productService.mapToEntity(productDTO);
        Product savedProduct = productService.save(product);
        return ResponseEntity.ok(productService.mapToDTO(savedProduct));
    }

    // Actualizar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Product existingProduct = productService.findEntityById(id);
        productService.updateEntityFromDTO(existingProduct, productDTO);
        Product updatedProduct = productService.save(existingProduct);
        return ResponseEntity.ok(productService.mapToDTO(updatedProduct));
    }

    // Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
