package com.jasperSpring.springjasper.service;

import com.jasperSpring.springjasper.model.Invoice;
import com.jasperSpring.springjasper.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepository;
    public void createInvoice(Invoice invoice) {
        invoiceRepository.save(invoice);
    }
}
