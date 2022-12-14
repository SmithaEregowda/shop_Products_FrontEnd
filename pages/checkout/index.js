import { Avatar, Backdrop, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import OrderProducts from '../../components/product/OrderProducts';
import cookieCutter from 'cookie-cutter'
import { clearCart, getCartByUser } from '../../services/cartservice';
import { postOrder } from '../../services/orderservide';

const CheckOut = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [Address, setShipAddress] = useState();
  const [PayMentMode, setPayMentMode] = useState("cash and delivery");
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState(false)
  const [notifydata, setMessage] = useState({})
  const [products, setProducts] = useState([]);
  useEffect(() => {
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
      })
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
      Address,
      PayMentMode,
      totalPrice,
      //isDeliverd: false,
      isfromcart: router.query.id ? false : true
    }
    const requestOptions = {
      method: 'Post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    postOrder(requestOptions).then((data) => {
      setMessage(data)
      setNotify(true)
      setLoading(false)
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
          setMessage(data)
          setNotify(true)
          setLoading(false)
        })
      }
    })
  }
  return (
    <div className='checkout-details'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notify}
        autoHideDuration={2000}
        onClose={() => setNotify(false)}
        severity="success"
        message={notifydata?.message}
        key={'top' + 'right'}
      />
      <div className='order-details'>
        <div className='product-summary'>
          {!router.query.id ?
            <div>
              {cartItems && cartItems?.products?.length > 0
                && cartItems.products.map(prod => (
                  <OrderProducts
                    key={prod.product}
                    prodId={prod.product}
                    quantity={prod?.quantity}
                    isfromcart={true}
                    handeleTotalPrice={handeleTotalPrice}
                  />
                ))}
            </div>
            :
            <OrderProducts
              prodId={router.query.id}
              quantity={1}
              isfromcart={false}
              cartItems={cartItems}
              handeleTotalPrice={handeleTotalPrice}
            />
          }

        </div>
        <div className='ordersection'>
          <div className='add-fileds'>
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
          </div>
        </div>
      </div>
      <div className='orderActions'>
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
      </div>
    </div>
  )
}

export default CheckOut