package com.jasperSpring.springjasper.repository;

import com.jasperSpring.springjasper.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice,String> {
}
