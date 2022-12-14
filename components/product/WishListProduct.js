import { Avatar, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getProductById } from '../../services/productservices';
import cookieCutter from 'cookie-cutter'
import { postCart } from '../../services/cartservice';
import { useRouter } from 'next/router';
import { removefromwishlist } from '../../services/wishlistsevice';

const WishListProduct = ({ prodId, cartItems, setLoading, setNotify,
    setMessage, getWishListByUserId }) => {
    const [productdetails, setDetails] = useState({});
    const router = useRouter();
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

    const handleAddToCart = (prodId) => {
        const payload = {
            userId: cookieCutter.get('userId'),
            prodId: prodId
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
            setLoading(false)
            router.reload('/wishlist')
        })
    }
    const handledelete = (prodId) => {
        let userId = cookieCutter.get('userId');
        const token = cookieCutter.get('token');
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        removefromwishlist(userId, prodId, requestOptions)
            .then((data) => {
                setMessage(data)
                setNotify(true)
                getWishListByUserId(token, userId)
                setLoading(false)
                //router.reload('/cart')
            })
    }

    return (
        <div className='product-card' key={productdetails?.productId}>
            <div className='product-imgContainer'>
                <Avatar
                    sx={{ width: 100, height: 100, bgcolor: '#11cd6b' }}
                    src={'https://shop-products-api.vercel.app/' + productdetails?.productImg}
                    variant="square"
                />
            </div>
            <div className='product-title'>
                {productdetails?.title}
            </div>
            <div className='product-subTitle'>
                {productdetails?.subTitle}
            </div>
            <div className='product-price'>
                RS.{productdetails?.price}
            </div>
            <div className='product-Actions'>
                <div className='add-Delete'>
                    {
                        (cartItems && cartItems.length > 0 &&
                            cartItems.findIndex(p => p.product.toString() === productdetails?._id) > -1) ?
                            <Button
                                variant="contained"
                                color='success'
                                onClick={() => router.push({
                                    pathname: 'cart'
                                })}
                                fullWidth
                            >
                                Go To Cart
                            </Button> :
                            <Button
                                variant="contained"
                                color='success'
                                onClick={() => handleAddToCart(productdetails?._id)}
                                fullWidth
                            >
                                Add To Cart
                            </Button>
                    }

                    <Button
                        variant="contained"
                        color='error'
                        onClick={() => handledelete(productdetails?._id)}
                        fullWidth
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WishListProduct