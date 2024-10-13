package com.jasperSpring.springjasper.repository;

import com.jasperSpring.springjasper.model.Products;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface ProductRepository extends MongoRepository<Products,Long> {

}
