import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import styles from './checkout.module.scss'
import CardPayStrip from '../cardpay'

const PaymentDetails = ({
  handelStep,
  setPayMentMode,
  PayMentMode,
  orderHandler
}) => {
  const handleChange=(e)=>{
    setPayMentMode({
      ...PayMentMode,
      paymentType:e.target.value
    })
  }
  return (
    <div className={styles.paymentWrapper}>
          <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Payment Options</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="phonepe"
                name="radio-buttons-group"
                onChange={handleChange}
              >
            <FormControlLabel value="phonepe" 
            control={<Radio />} label="Phone Pe" 
            className={styles.payOptions} />
             {PayMentMode?.paymentType==="phonepe"&&
              <div>UPI Payment is not available at the moment</div>
             }
            <FormControlLabel value="upi" 
            control={<Radio />} label="UPI"
            className={styles.payOptions}
             />
             {PayMentMode?.paymentType==="upi"&&
              <div>UPI Payment is not available at the moment</div>
             }
            <FormControlLabel value="credit" 
            control={<Radio />} label="Credit Card"
            className={styles.payOptions}
             />
             {PayMentMode?.paymentType==="credit"&&
              <CardPayStrip />
             }
            <FormControlLabel value="cash" 
            control={<Radio />} label="Cash On Delivery" 
            className={styles.payOptions}
            />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.paymentAction}>
          <Button
              variant="outlined"
             className={styles.payBtn}
             color="success"
             onClick={()=>handelStep("shipinfo")}
             >
              Go Back
            </Button>
            <Button
              variant="outlined"
             className={styles.payBtn}
             color="success"
             onClick={orderHandler}
             >
              Place Order
            </Button>
          </div>
    </div>
  )
}

export default PaymentDetails