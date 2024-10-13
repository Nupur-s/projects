package com.jasperSpring.springjasper.model;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Products {
    @Id
    Long id;
    String name;
    Long price;
    Long quantity;
}
