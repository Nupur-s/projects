package com.jasperSpring.springjasper.controller;

import com.jasperSpring.springjasper.model.Login;
import com.jasperSpring.springjasper.service.CredentialService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class CredentialController {

    @Autowired
    CredentialService credentialService;

    @PostMapping("/login")
    public String validateCredentials(@RequestBody Login login){

        return credentialService.validate(login);
    }
}
