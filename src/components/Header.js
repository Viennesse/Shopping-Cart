import React from 'react'
import {Navbar,Nav, Container, FormControl, Dropdown, Badge} from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa';
import {Link} from "react-router-dom";
import { CartState } from '../context/Context';
import {AiTwotoneDelete} from 'react-icons/ai'
import Button from 'react-bootstrap/Button';

const Header = () => {

  const {stan: {cart}, dispatch, productDispatch} = CartState()

  return (
    <Navbar bg="dark" variant="dark" style={{height:80}}>
        <Container>
          <Navbar.Brand>
            <Link to='/'>Shopping cart</Link>
          </Navbar.Brand>
          <Navbar.Text className='search'>
            <FormControl style={{width: 400}} placeholder="Search a product"
            className='m-auto'
              onChange={(e) => {
                productDispatch({type: "FILTER_BY_SEARCH", 
                payload: e.target.value,})
              }}
            />
          </Navbar.Text>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant='success'>
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge>{cart.reduce((akk, curr) => {
                   return akk + Number(curr.qty);
                },0)}
           </Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{minWidth:370}}>
                {cart.length > 0 ? (
                  <>
                    {
                      cart.map(prod => (
                        <span className='cartitem' key={prod.id}>
                          <img 
                          src={prod.image}
                          className="cartItemImg"
                          alt={prod.name}
                          />
                          <div className='cartItemDetail'>
                            <span>{prod.name}</span>
                            <span>{prod.price.split(".")[0]} PLN</span>
                          </div>
                          <AiTwotoneDelete
                            fontsize="20px"
                            style={{cursor:"pointer"}}
                            onClick={ () => 
                            dispatch({type: "REMOVE_FROM_CART", 
                            payload: prod,}) } 
                          />
                        </span>
                      ))}
                      <Link to="/cart">
                        <Button style={{width:"95%", margin: "0 10px"}}>Go to cart</Button>
                      </Link>
                  </>
                ) : (
                  <span style={{padding:10}}>Cart is empty!</span>
                )} 
                
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
           
        </Container>
      </Navbar>
  )
}

export default Header
