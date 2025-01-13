package com.app.starter1.controllers;

import com.app.starter1.dto.ProductFileRequest;
import com.app.starter1.dto.ProductoRequest;
import com.app.starter1.persistence.entity.Customer;
import com.app.starter1.persistence.entity.Image;
import com.app.starter1.persistence.entity.Product;
import com.app.starter1.persistence.repository.ImageRepository;
import com.app.starter1.persistence.repository.ProductRepository;
import com.app.starter1.persistence.services.ProductService;
import com.app.starter1.persistence.services.StorageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.time.format.DateTimeFormatter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    StorageService storageService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    ImageRepository imageRepository;

    @GetMapping
    @Transactional
    // Obtener todos los products
    public List<Product> findAll() {
        return productRepository.findAllWithImage();
    }

    @GetMapping("/customer/{id_customer}")
    public ResponseEntity<List<Product>> getProductsByCustomer(@PathVariable Long id_customer) {
        List<Product> products = productService.getProductsByCustomer(id_customer);
        return ResponseEntity.ok(products);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Product> crearProducto(
            @RequestPart("producto") String productoJson,
            @RequestPart(value = "file", required = false) MultipartFile file
            ) throws JsonProcessingException {

        // Deserializar el JSON del producto
        ProductoRequest productoRequest = objectMapper.readValue(productoJson, ProductoRequest.class);

        String path = storageService.Store(file);
        String host = request.getRequestURL().toString().replace(request.getRequestURI(),"");
        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/media/")
                .toString();

        Product producto = convertirAEntidad(productoRequest);


        Product productoGuardado = productService.guardarProductoConContrato(producto, productoRequest.getCustomer());

        //elacion imagen

        Image image = new Image();

        image.setEquipment(productoGuardado.getId());
        image.setName(path); // Ruta del archivo devuelta por Store

        // Establecer la fecha formateada
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MM-dd-yy");
        String formattedDate = LocalDate.now().format(dateFormatter);

        // Establecer la hora formateada
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String formattedTime = LocalTime.now().format(timeFormatter);

        image.setDate(formattedDate);  // Fecha formateada en MM-dd-yy
        image.setHour(formattedTime);  // Hora formateada en HH:mm:ss
        imageRepository.save(image);



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
                .customer(productoRequest.getCustomer())
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
