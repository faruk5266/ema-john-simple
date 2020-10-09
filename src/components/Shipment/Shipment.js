import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../processPayment/ProcessPayment';
import './shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);

    const onSubmit = data => {
          setShippingData(data);
     };

     const handlePaymentSuccess = paymentId => {
      const savedCart = getDatabaseCart();
      const orderDetails =  {
        ...loggedInUser,
         products: savedCart,
          shipment: shippingData,
          paymentId,
           orderTime: new Date()
          }

      fetch('https://shrouded-beach-53601.herokuapp.com/addOrder',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      })

      .then(res => res.json())
      .then(data =>{
        if(data){
          processOrder();
          alert('Your  order has been created successfully')
        }
      })
     }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    
    <div className="row">
      <div style={{display: shippingData ? 'none':'block'}} className="col-md-6">
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" placeholder="Put your name here" defaultValue={loggedInUser.name} placeholderref={register({ required: true })} />
      {errors.name && <span className="error" >Name is required</span>}

      <input name="email" placeholder="Please enter a valid email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
      {errors.email && <span className="error" >Email is required</span>}

      <input name="address" placeholder="Please enter a valid address" ref={register({ required: true })} />
      {errors.address && <span className="error" >Address is required</span>}

         <input name="phone" placeholder="Give your phone number" ref={register({ required: true })} />
      {errors.phone && <span className="error" >Phone is required</span>}

      <input type="submit" />
    </form>
      </div>


      <div style={{display: shippingData ? 'block':'none'}}  className="col-md-6">
        <h1>Your Payment is here </h1>
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>  
  );
};

export default Shipment;