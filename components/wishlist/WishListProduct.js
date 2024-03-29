import { Avatar, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getProductById } from '../../services/productservices';
import cookieCutter from 'cookie-cutter'
import { postCart } from '../../services/cartservice';
import { useRouter } from 'next/router';
import { removefromwishlist } from '../../services/wishlistsevice';
import styles from './wishlist.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';

const WishListProduct = ({ prodId, cartItems, setLoading, getWishListByUserId ,enqueueSnackbar}) => {
        const API_PATH='https://shop-products-api-1q6w.vercel.app'
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
        setLoading(true)
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
            enqueueSnackbar(data?.message, 
                { variant:data?.status==200?'success':"error"
                ,anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
            setLoading(false)
            router.reload('/wishlist')
        })
    }

    const handledelete = (prodId) => {
        setLoading(true)
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
                enqueueSnackbar(data?.message, 
                    { variant:data?.status==200?'success':"error"
                    ,anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
                getWishListByUserId(token, userId)
                setLoading(false)
                //router.reload('/cart')
            })
    }

    return (
        <div className={styles.wishlistRow} key={productdetails?.productId}>
            <div className={styles.prodImage}>
                <div  onClick={() => handledelete(productdetails?._id)}>
                <CancelIcon color='action' />
                </div>

            <div className={`product-imgContainer ${styles.productImgContainer}`}>
                <Avatar
                    sx={{ width: 100, height: 100, bgcolor: '#11cd6b' }}
                    src={`${API_PATH}/` + productdetails?.productImg}
                    variant="square"
                />
            </div>
            <div className={styles.prodInfo}>
                {productdetails?.title}
            </div>
            </div>
            <div className={styles.prodInfo}>
                RS.{productdetails?.price}
            </div>
            <div className={styles.prodInfo}>
                In stock
            </div>
            <div className={styles.prodInfo}>
                <div className={styles.actionItems}>
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
                </div>
            </div>
        </div>
    )
}

export default WishListProduct