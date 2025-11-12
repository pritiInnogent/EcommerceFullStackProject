package com.prettyfinds.controller;

import com.prettyfinds.model.Product;
import com.prettyfinds.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;
    
    @GetMapping()
    public ResponseEntity<List<Product>> getAllProducts(){

        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product>  getProductById(@PathVariable long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable String category){
        return ResponseEntity.ok(productService.getProductByCategory(category));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = productService.getAllProducts().stream()
                .map(Product::getCategory)
                .distinct()
                .toList();
        return ResponseEntity.ok(categories);
    }

}
