import { Avatar, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { getProductById } from '../../services/productservices'
import QuantityItem from './QuantityItem'
import { postCart, removefromCart } from '../../services/cartservice'
const CartProduct = ({ prodId, quantity, getCartByUserId }) => {
    const [productdetails, setDetails] = useState({});
    const [quantityNum, setQuantity] = useState(quantity);
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState(false)
    const [notifydata, setMessage] = useState({})
    useEffect(() => {
        const token = cookieCutter.get('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        getProductById(prodId, requestOptions).then((data) => {
            setDetails(data?.product)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prodId]);

    const updateCartHandler = () => {
        let userId = cookieCutter.get('userId');
        const payload = {
            userId: userId,
            prodId: prodId,
            quantity: quantityNum
        }
        const token = cookieCutter.get('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };
        postCart(requestOptions).then((data) => {
            setMessage(data)
            setNotify(true)
            getCartByUserId(token, userId)
            setLoading(false)
            //router.reload('/cart')
        })

    }

    const removefromCartHandler = () => {
        let userId = cookieCutter.get('userId');
        const token = cookieCutter.get('token');
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        removefromCart(userId, prodId, requestOptions)
            .then((data) => {
                setMessage(data)
                setNotify(true)
                getCartByUserId(token, userId)
                setLoading(false)
                //router.reload('/cart')
            })
    }
    return (
        <div className='cart-Item'>
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
            <div className='product-details'>
                <div className='cart-Image'>
                    <Avatar
                        sx={{ width: 100, height: 100, bgcolor: '#11cd6b' }}
                        src={'https://shop-products-api.vercel.app/' + productdetails?.productImg}
                        variant="square"
                    />
                </div>
                <div className='cart-description'>
                    <div className='product-title'> {productdetails?.title}</div>
                    <div className='product-subTitle'>{productdetails?.subTitle}</div>
                </div>
                <div className='cart-price'>
                    RS.{productdetails?.price}
                </div>
                <QuantityItem
                    quantity={quantity}
                    price={productdetails?.price}
                    quantityNum={quantityNum}
                    setQuantity={setQuantity}
                />
            </div>
            <div className='cart-Actions'>
                <div className='cart-update'>
                    <Button
                        variant="contained"
                        color='success'
                        onClick={updateCartHandler}
                        fullWidth
                    >
                        Update
                    </Button>
                </div>
                <div className='cart-remove'>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={removefromCartHandler}
                        fullWidth
                    >
                        Remove
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default CartProduct