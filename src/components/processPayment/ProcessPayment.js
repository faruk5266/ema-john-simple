import React from 'react';
import { Elements,} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';


const stripePromise = loadStripe('pk_test_51HZvvHJ9qYp6owyBOX4P2aMIvePn4sCZTv2cjWUfOmPSkj3Vj4T5yHWscdWA7CnNefKi6GGMNjS3mq3TcEiFkfvH00BEIEgpzj');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
           <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;