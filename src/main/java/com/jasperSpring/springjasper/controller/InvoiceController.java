package com.jasperSpring.springjasper.controller;

import com.jasperSpring.springjasper.model.Invoice;
import com.jasperSpring.springjasper.model.Order;
import com.jasperSpring.springjasper.model.Products;
import com.jasperSpring.springjasper.service.DataMapper;
import com.jasperSpring.springjasper.service.InvoiceService;
import com.jasperSpring.springjasper.service.PdfGenerator;
import com.jasperSpring.springjasper.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class InvoiceController {
    @Autowired
    InvoiceService invoiceService;

    @Autowired
    private PdfGenerator documentGenerator;

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

    @Autowired
    private DataMapper dataMapper;

    @Autowired
    ProductService productService;
    @PostMapping("/invoice")
    public String generateInvoice(Model model , @RequestBody Invoice invoice){
        invoiceService.createInvoice(invoice);
        String finalHtml = null;
        List<Order>purchase = invoice.getPurchase();
        for(Order ord:purchase){
            productService.deductQuantity(ord.getId(), ord.getQuantity());
        }

        System.out.println(invoice.getTotal());
        Context dataContext = dataMapper.setData(purchase, invoice.getTotal(),invoice.getCustomer(),invoice.getDate());
        model.addAttribute("items",purchase);
        model.addAttribute("total",invoice.getTotal());
        model.addAttribute("customer",invoice.getCustomer());
        model.addAttribute("date",invoice.getDate());
        finalHtml = springTemplateEngine.process("list", dataContext);

        documentGenerator.htmlToPdf(finalHtml,invoice.getCustomer());

        return "list";
    }
}
