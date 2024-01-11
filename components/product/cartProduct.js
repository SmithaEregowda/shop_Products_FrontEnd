import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { getProductById } from '../../services/productservices'
import QuantityItem from './QuantityItem'
import DeleteIcon from '@mui/icons-material/Delete';
import { postCart, removefromCart } from '../../services/cartservice'
const CartProduct = ({ prodId, quantity, getCartByUserId ,setLoading,enqueueSnackbar}) => {
    const [productdetails, setDetails] = useState({});
    const API_PATH='https://shop-products-api-1q6w.vercel.app'
    const [quantityNum, setQuantity] = useState(quantity);

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

    const updateCartHandler = (qty) => {
        setLoading(true)
        let userId = cookieCutter.get('userId');
        const payload = {
            userId: userId,
            prodId: prodId,
            quantity: qty
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
            enqueueSnackbar(data?.message, 
                { variant:data?.status==200?'success':"error",anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
            setLoading(false)
            //router.reload('/cart')
        })

    }

    const removefromCartHandler = () => {
        setLoading(true)
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
                enqueueSnackbar(data?.message, 
                    { variant:data?.status==200?'success':"error"
                    ,anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
                getCartByUserId(token, userId)
                setLoading(false)
                //router.reload('/cart')
            })
    }
    
    return (
        <div className='cart-Item'>
                <div className='productInfo'>
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
                    <div className='cart-price'>
                    RS.{productdetails?.price}
                </div>
                </div>
                </div>
                <QuantityItem
                    quantity={quantity}
                    price={productdetails?.price}
                    quantityNum={quantityNum}
                    setQuantity={setQuantity}
                    updateCartHandler={updateCartHandler}
                />
            <div className='cart-Actions'>
                    <DeleteIcon
                        onClick={removefromCartHandler}
                        color="error"
                        className='errorIcon'
                     />
            </div>

        </div>
    )
}

export default CartProduct