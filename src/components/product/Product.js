import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => { 
    const { img, name, price, seller, stock} = props.product;                         
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='display-product'>
               <h4 className='product-name'>{name}</h4>
                <p><small>by:{seller}</small></p>
                 <p>${price}</p>
                 <p><small>Only {stock} left in stock- order soon</small></p>
                 <button 
                 className='main-btn'
                 onClick ={() => props.handleClick(props.product)}
                 >
                     <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;