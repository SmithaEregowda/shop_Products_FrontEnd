import { Avatar, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getProductById } from '../../services/productservices';
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router';
import styles from './checkout.module.scss'

const CheckoutProducts =
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
        const [productPrice, setProductPrice] = useState();
        const API_PATH='https://shop-products-api-1q6w.vercel.app'

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
            <div className={styles.cartItem}>
                <div className={styles.cartImage}>
                        <Avatar
                            sx={{ width: 70, height: 70, bgcolor: '#11cd6b' }}
                            src={`${API_PATH}/` + productdetails?.productImg}
                            variant="square"
                            className={styles.image}
                        />
                </div>
                <div className={styles.cartDescription}>
                        <div className={styles.title}> {productdetails?.title}</div>
                        <div className={styles.price}>
                            RS.{productdetails?.price}&nbsp;&nbsp;*
                        </div>
                        <div className={styles.price}>
                            {quantity} Item
                        </div>
                </div>
                <div className={styles.totalPrice}>
                    RS.{productPrice}
                </div>
            </div>
        )
    }

export default CheckoutProducts
