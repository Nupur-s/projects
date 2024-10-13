import React from "react";
import axios from 'axios';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';

function UpdateStock(props){
    const[show,setShow] = useState(false);
    const[res,setRes] = useState({"id":props.product.id,"name":props.product.name,"price":props.product.price,"quantity":props.product.quantity});

    function handleChange(event){
        const {name,value} = event.target;
        setRes(prevValue =>{
            return {...prevValue, [name]:value}
        })
    }

    function handleClick(){     
        axios.put('http://localhost:8080/inventory',res,{headers:{ 'Content-Type': 'application/json' }})
        .then((response) =>{console.log(res);console.log(response); })
        .catch((error) => {console.log(error); });
    }
    return(
        <>
        <Modal  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Update {props.product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" >
                <FormLabel>Product ID</FormLabel>
                <Form.Control
                type="text"
                pattern ="^[0-9]*$"
                title='ID can only be numeric'
                name='id'
                required 
                value = {props.product.id}
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <FormLabel>Product Name</FormLabel>
                <Form.Control
                type="text"
                name='name'
                required 
                value = {props.product.name}
              />
            </Form.Group>
            <Form.Group>
            <FormLabel>Price Per Unit</FormLabel>
                <Form.Control
                type="text"
                pattern ="^[0-9]*$"
                title='Price can only be numeric'
                name='price'
                required 
                placeholder = {props.product.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
            <FormLabel>Quantity</FormLabel>
                <Form.Control
                type="text"
                pattern ="^[0-9]*$"
                title='Quantity can only be numeric'
                name='quantity'
                required 
                placeholder = {props.product.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
                <Button variant="danger" onClick={()=>{setShow(false)}}>Cancel</Button>
                <Button type='submit' variant="success" onClick={handleClick}>Save Changes</Button>
            </Form.Group>
            </Form>
        </Modal.Body>
       
      </Modal>
          <Button variant="warning" onClick={()=>setShow(true)}>Update</Button>
        </>
      
    );
}

export default UpdateStock;