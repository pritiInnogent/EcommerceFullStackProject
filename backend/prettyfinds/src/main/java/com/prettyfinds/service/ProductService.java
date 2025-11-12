package com.prettyfinds.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.prettyfinds.repository.ProductRepository;
import com.prettyfinds.model.Product;
import java.util.List;


@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts(){

        return productRepository.findAll();
    }

    public Product getProductById(long id){
        return productRepository.findById(id).get();
    }

    public List<Product> getProductByCategory(String category){
        return productRepository.findByCategory(category);
    }
}
