import { Avatar, Backdrop, Button, CircularProgress, Snackbar, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getProductById, processRequest } from '../../services/productservices';
import cookieCutter from 'cookie-cutter'

const ReqProduct = 
({
    prodId,
    isDeliverd,
    requestedUser,
    orderId,
    requestId,
    processRequest
}) => {
    const [productdetails, setDetails] = useState({});
    const API_PATH='https://shop-products-api-1q6w.vercel.app';
    let steps = ["Ordered", "Shipped", "Delivered"];
    useEffect(() => {
        const token = cookieCutter.get('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        getProductById(prodId, requestOptions).then((data) => {
            setDetails(data?.product);
        })

        // const requestOptions2 = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        // getUser(userId, requestOptions2).then(data => {
        //   setAuth(data?.user);
        //     dispatch({ type: 'addUser', payload: data?.user})
        // })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prodId]);

    const handleRequest=(mode)=>{
        
        const token = cookieCutter.get('token');
        const payload={
            mode:mode,
            orderId:orderId,
            reQusetedProd:prodId,
            DeliverySatus:isDeliverd,
            requestId:requestId
        }
        const requestOptions={
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        processRequest(requestOptions)
    }
    console.log(isDeliverd,isDeliverd!=="Canceled")

  return (
    <div className='product-card' key={productdetails?._id}>
            <div className='product-imgContainer'>
              <Avatar
                sx={{ width: "100%", height: 150, bgcolor: '#11cd6b' }}
                src={`${API_PATH}/` + productdetails?.productImg}
                variant="square"
              />
            </div>
            <div className="product-footer">
            <div className='product-title'>
              {productdetails?.title}
            </div>
            <div className='product-price'>
              RS.{productdetails?.price}
            </div>
              </div>
            <div className='product-step'>
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
            <div className='product-Actions'>
              
                    <div className='add-Delete'>
                    {isDeliverd!=="Canceled"&&
                    <Button
                    variant="contained"
                    color='success'
                    onClick={() => isDeliverd!=="Deliverd"&&handleRequest("accept")}
                    fullWidth
                  >
                    {isDeliverd==="Ordered"&&"Accept"}
                    {isDeliverd==="Shipped"&&"Deliver"}
                    {isDeliverd==="Delivered"&& "Item Has been Delivered"}
                  </Button>

                    }
                      
                      {isDeliverd!=="Delivered"&&<Button
                        variant="contained"
                        color='error'
                        onClick={() => isDeliverd!=="Delivered"&&handleRequest("reject")}
                        fullWidth
                      >
                         {isDeliverd==="Canceled"? "Item Has been Canceled":"Cancel"}
                      </Button>}
                    </div> 
            </div>
          </div>
  )
}

export default ReqProduct