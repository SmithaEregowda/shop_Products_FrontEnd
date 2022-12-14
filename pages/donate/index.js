import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CheckoutForm } from '../../components/checkOutForm';

const Donate = () => {
    const PUBLIC_KEY = "pk_test_51LSgoUSFmHpNb8iU7NUg5wItbwWrQ2r3wBBUfpMKwhd9LIUXlMMi5ravjHkUAp0d8Dv6VbsKWgaddyoRI1sYc9Sn00SvKhH9bc";
    const stripeTestPromise = loadStripe('pk_test_51LSgoUSFmHpNb8iU7NUg5wItbwWrQ2r3wBBUfpMKwhd9LIUXlMMi5ravjHkUAp0d8Dv6VbsKWgaddyoRI1sYc9Sn00SvKhH9bc');
    //const stripe = useStripe();
    //const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: elements.getElement(CardElement),
    //   });
  
    //   if (!error) {
    //     console.log("Stripe 23 | token generated!", paymentMethod);
    //     //send token to backend here
    //   } else {
    //     console.log(error.message);
    //   }
    };
    return (
        <div>
            <Elements stripe={stripeTestPromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

export default Donate