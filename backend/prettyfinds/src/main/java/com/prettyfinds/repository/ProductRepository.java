package com.prettyfinds.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.prettyfinds.model.Product;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface  ProductRepository extends JpaRepository<Product, Long >{

    public List<Product> findByCategory(String category);

}
