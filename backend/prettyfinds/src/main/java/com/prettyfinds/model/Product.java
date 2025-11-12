package com.prettyfinds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private Double price;
    
    @Column(length = 2000)
    private String description;
    
    @Column(nullable = false)
    private String category;

    private String image;
    
    private Double rating;
    private Integer ratingCount;

    public String getCategory() {
        return category;
    }
}