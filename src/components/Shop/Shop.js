import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Product from '../product/Product';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10);

    return (
        <div className='shop-container'>
           <div className="product-container">
               {
                    products.map(prdct => <Product product={prdct}></Product>)
               }
           </div>
           <div className="cart-container">
               <h3>this is cart</h3>
           </div>
        </div>
    );
};

export default Shop;