import React from 'react'
import { Avatar, Step, StepLabel, Stepper } from '@mui/material'

const OrderProduct = ({
    productdetails,
    address,
    steps,
    isDeliverd,
    API_PATH
}) => {
  return (
    <div className='cart-Item'>
            <div className='cart-Image'>
                <Avatar
                    sx={{ width: 100, height: 100, bgcolor: '#11cd6b' }}
                    src={`${API_PATH}/` + productdetails?.productImg}
                    variant="square"
                />
            </div>
            <div className='cart-description'>
                <div className='product-title'> {productdetails?.title}</div>
                <div className='product-subTitle'>{productdetails?.subTitle}</div>
                <div className='product-subTitle'>
                    RS.{productdetails?.price}
                </div>
            </div>
            <div className='cart-description'>
                <div className='adress-Label'>Delivery Adress:</div>
                <div className='product-subTitle'>
                {address?.address1},<br />
                {address?.city},<br />
                {address?.state},
                {address?.pincode}
                </div>
            
            </div>
            <div className='cartStep'>
            {
                isDeliverd!="Canceled"?
                    <Stepper
                        activeStep={steps.findIndex(item => item === isDeliverd)}
                        alternativeLabel
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>:
                    <Stepper
                    activeStep={["Ordered","Canceled"].findIndex(item => item === isDeliverd)}
                    alternativeLabel
                    >
                        <Step key={"Ordered"}>
                            <StepLabel>Ordered</StepLabel>
                        </Step>
                        <Step key={"Canceled"}>
                            <StepLabel error={true}>Canceled</StepLabel>
                        </Step>      
                    </Stepper>
                }
            </div>        
         </div>
  )
}

export default OrderProduct