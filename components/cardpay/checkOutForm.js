import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import cookieCutter from 'cookie-cutter'
import { postPayment } from "../../services/orderservide";
import { Button } from "@mui/material";
import styles from './cardpay.module.scss'
import Loader from "../loader";
import { useSnackbar } from "notistack";

export const CheckoutForm = ({setPaymentObj,paybleamount}) => {
  const stripe = useStripe();
  const checkelements = useElements();
  const [loading,setLoading]=useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: checkelements.getElement(CardElement),
    });
    console.log(error,paymentMethod)

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
          amount: paybleamount,
          token: paymentToken
        })
      }
      postPayment(requestOptions).then((data) => {
        if(data?.status===200){
          setPaymentObj(data);
        }else{
          enqueueSnackbar(data?.message, 
            { variant:data?.status==200?'success':"error"
            ,anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
        }
        setLoading(false)
      })

    } else {
      console.log(error.message);
      setLoading(false)
    }
  };

 
  

  return (
    <div className={styles.paymentWrapper}>
      {/* <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}> */}
          <Loader {...{loading}}/>
        <CardElement />
        <Button 
        variant="outlined"
         className={styles.payBtn}
         color="success"
         onClick={handleSubmit}
         >
          PAY
          </Button>
      {/* </form> */}
    </div>
  );
};
