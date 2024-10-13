package com.jasperSpring.springjasper.repository;

import com.jasperSpring.springjasper.model.Credential;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CredentialRepository extends MongoRepository<Credential,String> {
}
