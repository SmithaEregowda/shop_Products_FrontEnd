/* eslint-disable react/no-unescaped-entities */
import { Avatar, Backdrop, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import cookieCutter from 'cookie-cutter'
import { clearCart, getCartByUser } from '../../services/cartservice';
import { postOrder } from '../../services/orderservide';
import CheckoutProducts from '../../components/checkout/products';
import ShippingInfo from '../../components/checkout/shippinginfo';
import PaymentDetails from '../../components/checkout/payment';
import Loader from '../../components/loader';
import { useSnackbar } from 'notistack';

const CheckOut = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [Address, setShipAddress] = useState({});
  const [PayMentMode, setPayMentMode] = useState({paymentType:"credit"});
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([]);
  const [deliveryCharges]=useState(50)
  const [activeStep,setActiveStep]=useState("shipinfo");
  const { enqueueSnackbar } = useSnackbar();
  const [paymentObj,setPaymentObj]=useState()

  useEffect(() => {
    setLoading(true)
    let userId = cookieCutter.get('userId');
    const token = cookieCutter.get('token');
    if (!router.query.id) {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      };
      getCartByUser(userId, requestOptions).then((data) => {
        setCartItems(data?.cart);
        const productes = data?.cart?.products.map(prod => {
          return prod?.product
        });
        setProducts(productes)
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  }, [router.query.id]);

  const handeleTotalPrice = (prodprice) => {
    if (prodprice) {
      setTotalPrice(prev => prev + prodprice)
    }
  }

  const orderHandler = () => {
    setLoading(true)
    let userId = cookieCutter.get('userId');
    const token = cookieCutter.get('token');
    const payload = {
      userId,
      prodId: router.query.id ? router.query.id : products,
      products,
      PayMentMode,
      totalPrice,
      //isDeliverd: false,
      isfromcart: router.query.id ? false : true,
      ...Address
    }
    const requestOptions = {
      method: 'Post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    postOrder(requestOptions).then(
      (data) => {
      enqueueSnackbar(data?.message, 
        { variant:data?.status==200?'success':"error"
        ,anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
      if (!router.query.id && data?.orderDetails) {
        let userId = cookieCutter.get('userId');
        const token = cookieCutter.get('token');
        let requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
        clearCart(userId, requestOptions).then(data => {
          router.push("/orders")
          setLoading(false)
        })
      }else{
        router.push("/orders")
          setLoading(false)
      }
    })
  }

  const handelStep=(mode)=>[
    setActiveStep(mode)
  ]

  return (
    <div className='checkout-details'>
      <Loader loading={loading} />
      <div className='order-details'>
        <div className='product-summary'>
          <div className='title'>Summary Order</div>
          <div className='subTitle'>check you're Item and select you're shipping Item
            for better<br /> experience order Item
           </div>
          <div className='checkoutProducts'>
          {!router.query.id ?
            <div>
              {cartItems && cartItems?.products?.length > 0
                && cartItems.products.map(prod => (
                  <CheckoutProducts
                    key={prod.product}
                    prodId={prod.product}
                    quantity={prod?.quantity}
                    isfromcart={true}
                    handeleTotalPrice={handeleTotalPrice}
                  />
                ))}
            </div>
            :
            <CheckoutProducts
              prodId={router.query.id}
              quantity={1}
              isfromcart={false}
              cartItems={cartItems}
              handeleTotalPrice={handeleTotalPrice}
            />
          }
          </div>
          <div className='totalSummary'>
            <div className='rowTotal'>
              <div className='totalTitle'>Sub Total</div>
              <div className='amount'>RS.{totalPrice}</div>
            </div>
            <div className='rowTotal'>
              <div className='totalTitle'>Delivery Charges</div>
              <div className='amount'>RS.{deliveryCharges}</div>
            </div>
            <div className='rowTotal'>
              <div className='totalTitle'>Total</div>
              <div className='amount'>RS.{totalPrice+deliveryCharges}</div>
            </div>
          </div>
        </div>
        <div className='ordersection'>
            <div className='stepper'>
                <Stepper
                activeStep={["shipinfo","payment"]?.findIndex((item)=>item===activeStep)}
                sx={{
                  "& .MuiStepConnector-line": {
                    borderTopWidth: "4px",
                  },
                  "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                    borderColor: "red",
                  },
                  "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                    borderColor: "green",
                  },
              }}
                  >
                      <Step key={"shipinfo"}>
                        <StepLabel>Ship Info</StepLabel>
                    </Step>
                    <Step key={"payment"}>
                        <StepLabel>Payment</StepLabel>
                    </Step>      
                  </Stepper>
            </div>
            {
              activeStep==="shipinfo"&&
              <ShippingInfo 
              {...{
                setShipAddress,
                Address,
                handelStep
              }}
              />
            }
            {
              activeStep==="payment"&&
              <PaymentDetails 
              {...{
                handelStep,
                orderHandler,
                setPayMentMode,
                PayMentMode,
                paymentObj,
                setPaymentObj
              }}
              paybleamount={totalPrice+deliveryCharges}
              />
            }
          {/* <div className='add-fileds'>
            <div className='input-field'>
              <TextField
                id="outlined-basic"
                placeholder="Shipping Address"
                name='Address'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                onChange={(e) => setShipAddress(e.target.value)}
                fullWidth
              />
            </div>
            <div className='input-field'>
              <TextField
                id="outlined-basic"
                placeholder="total Price"
                name='totalPrice'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                value={totalPrice}
                readonly
                //onChange={handlefile}
                fullWidth
              />
            </div>
            <div className='input-field'>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">PayMentMode</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  defaultValue={"cash and delivery"}
                  value={PayMentMode}
                  onChange={(e) => setPayMentMode(e.target.value)}
                >
                  <FormControlLabel value="cash and delivery" control={<Radio />}
                    label="cash and delivery" />
                  <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                </RadioGroup>
              </FormControl>
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className='orderActions'>
        <Button
          variant="contained"
          color='success'
          onClick={orderHandler}
          fullWidth
        >
          Order
        </Button>
        <Button
          variant="contained"
          color='error'
          //onClick={updateCartHandler}
          fullWidth
        >
          Cancel
        </Button>
      </div> */}
    </div>
  )
}

export default CheckOut