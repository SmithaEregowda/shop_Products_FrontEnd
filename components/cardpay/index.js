import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CheckoutForm } from './checkOutForm';
import { loadStripe } from "@stripe/stripe-js";
import styled from 'styled-components'
import styles from './cardpay.module.scss'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CardPayStrip = ({
  paymentObj,setPaymentObj
}) => {
    const PUBLIC_KEY = "pk_test_51LSgoUSFmHpNb8iU7NUg5wItbwWrQ2r3wBBUfpMKwhd9LIUXlMMi5ravjHkUAp0d8Dv6VbsKWgaddyoRI1sYc9Sn00SvKhH9bc";
    const stripeTestPromise = loadStripe('pk_test_51LSgoUSFmHpNb8iU7NUg5wItbwWrQ2r3wBBUfpMKwhd9LIUXlMMi5ravjHkUAp0d8Dv6VbsKWgaddyoRI1sYc9Sn00SvKhH9bc');
  
  return (
    <Container>
    {!paymentObj?
    <Elements stripe={stripeTestPromise}>
    <CheckoutForm {...{setPaymentObj}}/>
  </Elements>
  :
  <div className={styles.paymentSuccess}> 
    <div className={styles.payIcon}><CheckCircleIcon color='success' sx={{ fontSize: 50 }} /></div>
    Payment Done successfully!!!
    <div className={styles.payAmt}>Rs.{paymentObj?.paidamount}</div>
    </div>}
  </Container>
  )
}

export default CardPayStrip;
const Container = styled.div`
  width: 350px;
`;