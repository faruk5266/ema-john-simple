import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';

const ProductDetails = () => {
   const {productkey} = useParams();
   const [loading, setLoading] = useState(true);    
   const [product, setProduct] = useState({});

   useEffect(() => {
        fetch('https://shrouded-beach-53601.herokuapp.com/product/'+ productkey)
        .then(res => res.json())
        .then(data =>{
             setProduct(data)
             setLoading(false)
        })
   },[productkey])


//    const product = fakeData.find(pd => pd.key === productkey);
 
    return (
        <div>
            <h1>Your Product Details</h1>
            {
                loading ? <p>Loading...</p> :
                <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;  