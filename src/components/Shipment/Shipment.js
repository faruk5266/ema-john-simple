import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    
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
  );
};

export default Shipment;