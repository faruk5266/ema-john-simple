import React from 'react';


const Cart = (props) => {
    const cart = props.cart;

    // const totalPrice = cart.reduce((total, prdct) => total + prdct.price, 0);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product =cart[i]; 
         total = total + product.price * product.quantity; 
        
    }

    let shipping = 0;
    if (total > 200) {
        shipping = 2.99;
    }
    else if(total > 500){
        shipping = 4.99;
    }
const tax = (total / 5).toFixed(2) ;

const grandTotal = (total + shipping + Number(tax)).toFixed(2);

const formatNumber = num => {
    const precision = num.toFixed(2)
    return Number(precision);
}

    return (
        <div>
            <h4>Ordered Summary</h4>
             <p>Items Ordered :{cart.length}</p>
            <p>Product Price:{formatNumber(total)}</p>
            <p><small>Shipping Cost:{shipping}</small></p>
            <p><small>Tax:{tax}</small></p>
             <p>Total Price:{grandTotal}</p> 
            <br/>
            {
            props.children 
            }      
        </div>
    );
};

export default Cart;