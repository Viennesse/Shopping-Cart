import React from 'react'
import { CartState } from '../context/Context';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Rating from './Rating';
import {AiTwotoneDelete} from 'react-icons/ai'



const Cart = () => {

  const { stan: {cart}, dispatch} = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc,curr) => 
      acc + Number(curr.price)*curr.qty
  , 0));


  
  }, [cart]);



  return (
    
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {cart.map(prod => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>
                  <span>{prod.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control as="select" value={prod.qty}
                  onChange={(e) => dispatch({
                    type: "CHANGE_CART_QTY",
                    payload: {id: prod.id, qty: e.target.value,}
                  })}
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x+1}>{x+1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type="button" variant="light" 
                  onClick={() => 
                  dispatch({ type: "REMOVE_FROM_CART", payload: {id: prod.id} }) //mozna tez: payload: prod
                    }
                  >
                    <AiTwotoneDelete fontsize="20px"/>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'> Ilosc sztuk: {cart.reduce((akk, curr) => {
          return akk + Number(curr.qty);
           },0)} sztuki.
        </span>
        <span style={{fontWeight: 700, fontSize: 20}}>Total: {total}</span>
        <Button type="button" disabled={cart.length===0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
        )
        }

export default Cart

