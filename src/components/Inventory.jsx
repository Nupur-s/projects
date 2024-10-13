import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import UpdateStock from './UpdateStock';
import { useAuth } from './AuthContext';
import NavigationBar from './NavigationBar';


function Inventory(){
    const authContext = useAuth();
    const [products, setProducts] = useState([{}]);
    const [showAddBox, setShowAddBox] = useState(false);
    const [res,setRes] = useState({"id":0,"name":"","price":0,"quantity":0});
    useEffect(()=>{
        const fetchData = async() =>{
        const result = await axios.get('http://localhost:8080/inventory');
        setProducts(result.data);
    };
    fetchData();
    
    },[]);

    function handleChange(event){
        const {name,value} = event.target;
        setRes(prevValue =>{
            return {...prevValue, [name]:value}
        })
    }

    function handleClick(){     
        axios.post('http://localhost:8080/inventory',res,{headers:{ 'Content-Type': 'application/json' }})
        .then((response) =>{console.log(res);console.log(response); })
        .catch((error) => {console.log(error); });
    }

    return(
    <><NavigationBar /><Container>
    <>   
      <Modal  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={showAddBox} onHide={()=>{setShowAddBox(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
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
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <FormLabel>Product Name</FormLabel>
                <Form.Control
                type="text"
                name='name'
                required 
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
                <Button variant="danger" onClick={()=>{setShowAddBox(false)}}>Cancel</Button>
                <Button type='submit' variant="success" onClick={handleClick}>Add Product</Button>
            </Form.Group>
            </Form>
        </Modal.Body>
       
      </Modal>
    </>

        <h3>Inventory</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price Per Unit</th>
                    <th>Quantity</th>
                    {authContext.isAdmin && <th>Update</th>}
                </tr>
            </thead>
            <tbody>
                {products.map(product =>
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    {authContext.isAdmin && <td><UpdateStock product = {product}/></td>}
                </tr>
                )}
            </tbody>
        </Table>
        <div>
        {authContext.isAdmin && <Button variant="success" onClick={()=>{setShowAddBox(true)}}>Add Product</Button>}
        </div>
    </Container>
    </>);
}

export default Inventory;