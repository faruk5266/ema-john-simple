import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => { 
    // console.log(props.product); 
    const { img, name, price, seller, stock, key} = props.product;                         
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='display-product'>
               <h4 className='product-name'><Link to={"/product/"+key}>{name}</Link></h4> 
                <p><small>by:{seller}</small></p>
                 <p>${price}</p>
                 <p><small>Only {stock} left in stock- order soon</small></p>
                {props.showAddToCart && <button 
                className='main-btn'
                onClick ={() => props.handleClick(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;