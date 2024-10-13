package com.jasperSpring.springjasper.service;

import com.jasperSpring.springjasper.model.Products;
import com.jasperSpring.springjasper.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public List<Products>findAllProducts(){
        return productRepository.findAll();
    }

    public void addProduct(Products product) {
        productRepository.save(product);
    }

    public String update(Products product) {
      Optional<Products> prod = productRepository.findById(product.getId());
      if(!prod.isPresent()){
          return "failed";
      }
      Products prodUpdate = prod.get();
      prodUpdate.setQuantity(product.getQuantity());
      prodUpdate.setPrice(product.getPrice());
      productRepository.save(prodUpdate);
      return "successful";
    }

    public void deductQuantity(Long id, Long quantity){
        Products prod = productRepository.findById(id).get();

        prod.setQuantity(prod.getQuantity()-quantity);
        productRepository.save(prod);

    }
}
