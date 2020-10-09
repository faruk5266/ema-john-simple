import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';    
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'; 
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);

    const [placeOrder, setPlaceOrder] = useState(false);
    const history = useHistory()

    const handleProceedCheckOut = () => {
        history.push('/shipment');
    }
    let thankyou;
    if(placeOrder){
        thankyou =  <img src={happyImage} alt=""/>
    }
   

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    useEffect(()=>{
        const savedCart = getDatabaseCart();
       const productKeys = Object.keys(savedCart);

       fetch('https://shrouded-beach-53601.herokuapp.com/productsByKeys', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body:JSON.stringify(productKeys)
       })

       .then(res => res.json())
       .then(data => setCart(data))

        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
            
        // });
        // setCart(cartProducts);
    },[]);
    return (
        <div className="twin-container">
           <div className="product-container">
           {
                cart.map(pd => <ReviewItem
                    //  key={pd.key}
                     removeProduct={removeProduct}
                     product={pd}></ReviewItem>)
            }
           </div>
           
      { thankyou }
           
           <div className="cart-container">
               <Cart cart={cart}>
                <button onClick={handleProceedCheckOut} className="main-btn">Proceed CheckOut</button>   
                </Cart>    
           </div>
            
        </div>
    );
};

export default Review;      