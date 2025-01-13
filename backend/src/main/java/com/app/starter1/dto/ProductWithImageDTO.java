package com.app.starter1.dto;

import com.app.starter1.persistence.entity.Image;
import com.app.starter1.persistence.entity.Product;

public class ProductWithImageDTO {
    private Product product;
    private Image image;

    public ProductWithImageDTO(Product product, Image image) {
        this.product = product;
        this.image = image;
    }

    // Getters y setters
}
