import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table'
import CloseButton from "react-bootstrap/esm/CloseButton";
import NavigationBar from "./NavigationBar";



function Buy(){
  

    const[validate,setValidate] = useState("invalid");
    const[customer,setCustomer] = useState("");//taking customer name from user;
    const[products, setProducts] = useState([{}]); //available items for sale
    const[purchase,setPurchase] = useState([]); //cart
    const[order,setOrder] = useState({"id":0,"name":"","price":0,"quantity":0});//current order
    const[price,setPrice] = useState(0);//amount for
    const[total,setTotal] = useState(0);//total amount so far
    const[disabled,setDisabled] = useState("disabled");//to disable buttons until product is added
    const[quantity,setQuantity] = useState(0);//for max quantity
    const[disabledAdd,setDisabledAdd] = useState("disabled");//to disable add button


    useEffect(()=>{
        const fetchData = async() =>{
        const result = await axios.get('http://localhost:8080/inventory');
        setProducts(result.data);
    };
    fetchData();
    },[]);

    function setCustomerName(event){
        const name= event.target.value;
        setValidate("");
        setCustomer(name);
    }

    function handleSelect(event){
        const prod = products.filter(product =>product.name === event.target.value);
        console.log(event.target.name);
        setOrder(prevValue =>{
            return {...prevValue, "id":prod[0].id, "price":prod[0].price, "name":prod[0].name}
        });
        setPrice(prod[0].price);
        setQuantity(prod[0].quantity);
        setDisabled("");
      
    }

    function handleChange(event){
        const{name,value} = event.target;
        const amount = value*price;
        
        if(value<=quantity){
            setOrder(prevValue =>{
                return {...prevValue, [name]:value, "price":amount}
            });
            setDisabledAdd("");
        }
        else{
            setDisabledAdd("disabled");
        }   
    }

    function removeItem(id){
        console.log(id);
        const remaining = purchase.filter(item => item.id !== id);
        const subtract = purchase.filter(item => item.id === id);
        console.log(subtract);
        setTotal(total-subtract[0].price);
        console.log(total);
        setPurchase(remaining);
  
        
    }

    function handleAdd(){
        setTotal(total+order.price);
       // console.log(order.price);
        setPurchase(oldValue =>[...oldValue,order]);
        setOrder({});
        setQuantity(0);
      //  console.log(purchase);
        setDisabled("disabled");
        setDisabledAdd("disabled");
    }

    function handleSubmit(event){
        event.preventDefault();
        if(customer.length <1 || customer === ""){
            setValidate("invalid")
            alert("Enter customer name");
            event.target.reset();
        }
        else{
            handleAdd();
            console.log(event);
            event.target.reset();
            event.target.name="username-form";
            event.target.reset();
        }
    
    }
    function generateInvoice(){
        const timeElapsed  = Date.now();
        const today = new Date(timeElapsed);
        const date = today.toISOString().substring(0,10);

        const res = {"customer":customer,"date":date,"purchase":purchase,"total":total};
        console.log(res);
        axios.post('http://localhost:8080/invoice',res,{headers:{ 'Content-Type': 'application/json' }})
        .then((response) =>{console.log(res);console.log(response); setPurchase([]); setTotal(0);window.location.reload(false);})
        .catch((error) => {console.log(error); });
    }

    return(
        <><NavigationBar />
        <Container>
           <h3>Order</h3> 
           <div>
           <Form name="username-form">
           <Row>
            <Col xs="auto">
            <InputGroup hasValidation>
                <Form.Control type="text" name = "customer" placeholder="customer name" required isInvalid={validate} onChange={setCustomerName} />
                <Form.Control.Feedback type="invalid">
                    Please enter customer name.
                </Form.Control.Feedback>
            </InputGroup>
              
            </Col>
           </Row>
           </Form>
           </div>
          
           <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <InputGroup>
                        <Form.Select onChange={handleSelect}>
                        <option>product</option>
                        {products.map(product =>
                            <option value={product.name}>{product.name}</option>
                        )}
                        </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xs="4">
                    <InputGroup>
                        <Form.Control type="Number" name="quantity" placeholder="quantity" min="0" max={quantity} disabled={disabled} onChange={handleChange}/>
                    </InputGroup>
                    </Col>
                    <Col xs ="3">
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control type="text" readOnly value={order.price} disabled={disabled}></Form.Control>
                        </InputGroup>
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="mb-2" disabled={disabledAdd}>Add</Button>
                    </Col>
                </Row>
           </Form>
           <h3>Invoice</h3>
           <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {purchase.map(purch =>
                <tr key={purch.id}>
                    <td>{purch.id}</td>
                    <td>{purch.name}</td>
                    <td>{purch.quantity}</td>
                    <td>{purch.price}</td>
                    <td><CloseButton  onClick={()=>{removeItem(purch.id)}}/></td>
                </tr>
                )}
            </tbody>
        </Table>
        <div>
           <p>Total =  {total}</p>
        </div>
        {purchase.length>0 && <Button type="submit" onClick={generateInvoice}>Generate Invoice</Button>}
        </Container>
        </>
    )
}

export default Buy;