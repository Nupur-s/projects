package com.jasperSpring.springjasper.service;

import com.jasperSpring.springjasper.model.Credential;
import com.jasperSpring.springjasper.model.Login;
import com.jasperSpring.springjasper.repository.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class CredentialService {
    @Autowired
    CredentialRepository credentialRepository;

    int strength = 10; // work factor of bcrypt

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());
    public String validate(Login login){
        String pwd = bCryptPasswordEncoder.encode(login.getPassword());
        System.out.println(login.getPassword()+" : "+pwd);
        Optional<Credential>optionalCred = credentialRepository.findById(login.getUsername());
        if(optionalCred.isPresent()){
            Credential cred = optionalCred.get();
            if(bCryptPasswordEncoder.matches(login.getPassword(), cred.getPassword())){
                String res = cred.getRole();
                return res;
            }
            return "failed";
        }
        return "failed";
    }
}
