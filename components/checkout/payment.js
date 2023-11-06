import { Button } from '@mui/material'
import React from 'react'

const PaymentDetails = ({
  handelStep
}) => {
  return (
    <div>
          <Button
              variant="outlined"
            //  className="payBtn"
             color="success"
             onClick={()=>handelStep("shipinfo")}
             >
              Go Back
            </Button>
            <Button
              variant="outlined"
            //  className="payBtn"
             color="success"
             onClick={()=>handelStep("shipinfo")}
             >
              Place Order
            </Button>
    </div>
  )
}

export default PaymentDetails