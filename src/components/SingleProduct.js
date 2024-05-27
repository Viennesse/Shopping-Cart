import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Rating from './Rating'
import { CartState } from '../context/Context';


const SingleProduct = ({prod}) => {

  const {stan: {cart}, dispatch} = CartState()
  
  

  return (
    <div className='products'>
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
        <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{paddingBottom: 10}}>
            <span>{prod.price.split(".")[0]} PLN</span> 
            {prod.fastDelivery? (<div>Fast delivery</div>) : (<div>4 days delivery</div>)}
            <Rating rating={prod.ratings} />
            <center>InStock: {prod.inStock}</center>
          </Card.Subtitle>
          {
            cart.some(el => el.id === prod.id)? 
            (<Button onClick={ ()=> { dispatch( { type:"REMOVE_FROM_CART",
             payload: prod, } ) } } variant="danger">Remove from cart</Button>) 
             :
            (<Button onClick={ ()=> { dispatch( { type:"ADD_TO_CART",
             payload: prod, } ) } } disabled={!prod.inStock}>
            {prod.inStock? "Add to cart" : "Out of stock"}
            </Button>)
            
         }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct 



