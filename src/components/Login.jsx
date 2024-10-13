import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import  Alert from 'react-bootstrap/Alert';
import { useAuth } from './AuthContext';

export default function Login(){

    const navigate = useNavigate();

    const authContext = useAuth();
    
    const[res,setRes] = useState({"username":"","password":""});
    const [show, setShow] = useState(false);

    function handleChange(event){
        const{name,value} = event.target;
        setRes(prevValue =>{return {...prevValue,[name]:value}});
      
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(res);
        axios.post('http://localhost:8080/login',res,{headers:{ 'Content-Type': 'application/json' }})
        .then((response) =>{console.log(response); 
            if(response.data ==="failed"){setShow(true)}
            else{if(response.data ==="admin"){authContext.setAdmin(true); localStorage.setItem("admin","true");}authContext.setAuthenticated(true); localStorage.setItem("authenticated",true); localStorage.setItem("username",res.username); navigate("/inventory");}})
        .catch((error) => {console.log(error); });
    }
    
    return (
    <Container fluid >
     <h3>Sign In</h3>
     <br></br>
        <Row className="justify-content-md-center">
            <Col md="auto">
            <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Invalid credentials</Alert.Heading>
                <p>The username or the password is incorrect. Please try again!</p>
            </Alert>
            <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <FormLabel>Enter User Name</FormLabel>
                    <Form.Control type="text" name="username" placeholder="username" required onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <Form.Control type="password" name="password" placeholder="Enter password" required onChange={handleChange}/>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <p className="forgot-password text-right">Forgot <a href="#"> password?</a></p>
            </Form>
            </Col>
        </Row>
    </Container>
      
    )
  
}