import { Avatar, Backdrop, Button, CircularProgress, Snackbar, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getProductById } from '../../services/productservices';
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router';

const OrderProducts =
    ({
        prodId,
        quantity,
        isfromcart,
        handeleTotalPrice,
        isfromOrders,
        isDeliverd
    }) => {
        const [productdetails, setDetails] = useState({});
        const router = useRouter();
        const [productPrice, setProductPrice] = useState()
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
                setProductPrice(data?.product?.price * quantity)
                if (handeleTotalPrice) {
                    handeleTotalPrice(data?.product?.price * quantity)
                }
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [prodId]);

        return (
            <div className='cart-Item'>

                <div className='product-details'>
                    <div className='cart-Image'>
                        <Avatar
                            sx={{ width: 100, height: 100, bgcolor: '#11cd6b' }}
                            src={'http://localhost:8080/' + productdetails?.productImg}
                            variant="square"
                        />
                    </div>
                    <div className='cart-description'>
                        <div className='product-title'> {productdetails?.title}</div>
                        <div className='product-subTitle'>{productdetails?.subTitle}</div>
                        <div>
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

                    {!isfromOrders &&
                        <div className='cart-price'>
                            RS.{productdetails?.price}&nbsp;&nbsp;*
                        </div>
                    }
                    {!isfromOrders &&
                        <div className='cart-price'>
                            {quantity}&nbsp;&nbsp;=
                        </div>
                    }
                    {!isfromOrders &&
                        <div className='cart-price'>
                            RS.{productPrice}
                        </div>
                    }
                </div>
            </div>
        )
    }

export default OrderProducts
