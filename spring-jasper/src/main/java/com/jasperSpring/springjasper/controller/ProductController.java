package com.jasperSpring.springjasper.controller;
import com.jasperSpring.springjasper.model.Products;
import com.jasperSpring.springjasper.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/inventory")
    public List<Products> getAllProducts() {
        List<Products>inventory = productService.findAllProducts();
        return inventory;
    }

    @PostMapping("/inventory")
    @ResponseStatus(HttpStatus.CREATED)
    public void addProducts(@RequestBody Products product){
        productService.addProduct(product);
    }


    @PutMapping("/inventory")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateStock(@RequestBody Products product){
        productService.update(product);
    }
}
