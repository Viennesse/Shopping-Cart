import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct';
import "./styles.css"
import Filters from './Filters';



const Home = () => {
  
const {stan: {products}, productState: {
  sort, byStock, byFastDelivery, byRating, searchQuery},} = CartState()

  /*
  console.log(products.map(el=> el.inStock))  // pokaze 20 produktow - czyli wszystkie produkty
  console.log(products.filter(el => el.inStock))  // pokaze 15 produktow,tylko te, ktore sa powyzej 0 w InStock
  console.log(products.map(el => el.fastDelivery)) // pokaze 20 produktow - czyli wszystkie produkty
  console.log(products.filter(el => el.fastDelivery)); // pokaze 15 produktow,tylko te, ktore sa maja fastDel = true
  */
  
  const transformProducts = () => {
    let sortedProducts = products;
    if(sort) {
      sortedProducts = sortedProducts.sort((a,b) => 
      sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      )
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
      console.log(!byStock )   // po zaladowaniu strony pokazuje tylko produkty inStock, na stanie, bo warunek w If
                              //  (!byTock = true) jest od razu spelniony. Gdy klikniemy na filter "Include out of Stock"
                              // to ten if juz nie zadziala i  pokaze wszystkie produkty, tez te Out of Stock
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
       // tu sytuacja odwrotna do powyzszej
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => 
      prod.name.toLowerCase().includes(searchQuery)
      )
    }
   return sortedProducts;
  }


return <div className='home'>
          <Filters />
          <div className='productContainer'> 
            { transformProducts().map((prod) =>  { 
              return <SingleProduct prod={prod} key={prod.id} />
            }) }   {/*tu bylo products.map zamiast transformproducts()*/}
          </div>
          
        </div>

}

export default Home



