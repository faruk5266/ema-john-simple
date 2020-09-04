import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const desing = {
        borderBottom: '1px solid lightgray',
        marginBottom: '10px',
        paddingBottom: '10px',
        marginLeft: '250px',
    }
    return (
        <div className style={desing}>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>{price}</small></p>
            <br/>
            <button onClick={() =>props.removeProduct(key)} className="main-btn">Remove Item</button>
        </div>
    );
};

export default ReviewItem;