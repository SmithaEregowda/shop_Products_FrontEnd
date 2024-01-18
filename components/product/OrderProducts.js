import React, { useState, useEffect } from 'react'
import { getProductById } from '../../services/productservices';
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router';
import OrderProduct from './orderprod';

const OrderProducts =
    ({
        prodId,
        quantity,
        isfromcart,
        handeleTotalPrice,
        isfromOrders,
        isDeliverd,
        address,
        orderInfo,
        getOrders
    }) => {
        const [productdetails, setDetails] = useState({});
        const router = useRouter();
        const [productPrice, setProductPrice] = useState()
        let steps = ["Ordered", "Shipped", "Delivered"];
        const API_PATH='https://shop-products-api-1q6w.vercel.app'

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
            <OrderProduct 
                {
                    ...{
                        productdetails,
                        steps,
                        isDeliverd,
                        address,
                        productPrice,
                        router,
                        API_PATH,
                        orderInfo,
                        getOrders
                    }
                }
            />
        )
    }

export default OrderProducts
