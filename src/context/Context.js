import React, { createContext, useContext, useReducer} from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer } from './Reducers';
import { productReducer } from './Reducers';


const Cart = createContext()
faker.seed(99);

const Context = ({ children }) => {

const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: ' https://ae01.alicdn.com/kf/S9200f0e74e0541dcb230cfd8c4d81dc52.jpg_350x350.jpg' ,
    inStock: faker.helpers.arrayElement([0,3,5,6,7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1,2,3,4,5]),
}))



const [stan, dispatch] = useReducer(cartReducer, {
  products: products,
  cart: []
})


const [productState, productDispatch] = useReducer(productReducer, {
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: "",
})

  
return <Cart.Provider value={{stan, dispatch, productState, productDispatch }}>
  { children }</Cart.Provider>
}


export default Context

export const CartState = () => {
  return useContext(Cart);
}