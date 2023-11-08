import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import cookieCutter from 'cookie-cutter'
import { postPayment } from "../../services/orderservide";
import { Button } from "@mui/material";
import styles from './cardpay.module.scss'

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      //send token to backend here
      let paymentToken = paymentMethod?.id;
      const Authtoken = cookieCutter.get('token')
      const userId = cookieCutter.get('userId')
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Authtoken}`
        },
        body: JSON.stringify({
          amount: 200,
          token: paymentToken
        })
      }
      postPayment(requestOptions).then((data) => {
        console.log(data)
      })

    } else {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.paymentWrapper}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <CardElement />
        <Button 
        variant="outlined"
         className={styles.payBtn}
         color="success"

         >
          PAY
          </Button>
      </form>
    </div>
  );
};