import React, { useState } from 'react'
import { Avatar, Box, Button, Modal, Step, StepLabel, Stepper } from '@mui/material'

const OrderProduct = ({
    productdetails,
    address,
    steps,
    isDeliverd,
    API_PATH,
    orderInfo
}) => {
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };

    const cancelOrder=()=>{
        console.log("cancel this")
    }

  return (
    <>
    <div className='cart-Item' onClick={()=>setOpen(true)}>
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
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "40%" }}>
        <div className='title'>
        <div className='title-overlay'> 
        {productdetails?.title}
        </div>
        <div className='product-subTitle'>({productdetails?.subTitle})</div>
        </div>
            <div className='image-overlay'>
                <Avatar
                    sx={{ width: 150, height: 150, bgcolor: '#11cd6b' }}
                    src={`${API_PATH}/` + productdetails?.productImg}
                    variant="square"
                />
            </div>
            <div className='description-overlay'>
                
                
                <div className='product-subTitle'>
                    RS.{productdetails?.price}
                </div>
            </div>
            <div className='description-overlay address'>
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
            <div className='overlay-btns'>
            {isDeliverd!=="Delivered"&&isDeliverd!=="Canceled"&&
            <Button variant="contained" color='success' onClick={cancelOrder} >
                CANCEL ORDER
            </Button>}
          <Button variant="contained" color='error' onClick={handleClose}>CLOSE</Button>
            </div>
        </Box>
      </Modal>
         </>
  )
}

export default OrderProduct