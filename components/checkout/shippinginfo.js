import React, { useEffect, useState } from 'react'
import styles from './checkout.module.scss'
import { Button, TextField } from '@mui/material'

const ShippingInfo = ({Address,setShipAddress,handelStep}) => {
  const [showBtn,setShowBtn]=useState(false)
  const addshiipingaddressHandle=(e)=>{
    setShipAddress({
      ...Address,
      [e.target.name]:e.target.value
    })
  }
  useEffect(()=>{
    if(Address?.pincode&&Address?.state&&Address?.address1){
      setShowBtn(true)
    }else{
      setShowBtn(false)
    }
  },[Address])

  return (
    <div className={styles.shiInfoWrapper}>
        <div className={styles.inputField}>
              <TextField
                id="outlined-basic"
                placeholder="Address 1"
                name='address1'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                onChange={(e) => addshiipingaddressHandle(e)}
                value={Address?.address1}
                fullWidth
              />
            </div>
            <div className={styles.inputField}>
              <TextField
                id="outlined-basic"
                placeholder="Address 2"
                name='address2'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                onChange={(e) => addshiipingaddressHandle(e)}
                value={Address?.address2}
                fullWidth
              />
            </div>
            <div className={styles.inputField}>
              <TextField
                id="outlined-basic"
                placeholder="City"
                name='city'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                onChange={(e) => addshiipingaddressHandle(e)}
                fullWidth
                value={Address?.city}
              />
            </div>
            <div className={styles.inputField}>
              <TextField
                id="outlined-basic"
                placeholder="State"
                name='state'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                onChange={(e) => addshiipingaddressHandle(e)}
                fullWidth
                value={Address?.state}
              />
            </div>
            <div className={styles.inputField}>
              <TextField
                id="outlined-basic"
                placeholder="Pin Code"
                name='pincode'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                onChange={(e) => addshiipingaddressHandle(e)}
                fullWidth
                value={Address?.pincode}
              />
            </div>
            <div className={styles.shipBtn}>
              {showBtn&&
              <Button
              variant="outlined"
            //  className="payBtn"
             color="success"
             onClick={()=>handelStep("payment")}
             >
              Confirm shipping Address?
            </Button>
            }
            </div>
    </div>
  )
}

export default ShippingInfo