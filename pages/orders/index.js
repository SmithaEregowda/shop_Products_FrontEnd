/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { getOrdersByUser } from '../../services/orderservide';
import OrderProducts from '../../components/product/OrderProducts';
import { Button } from '@mui/material';
import Loader from '../../components/loader';

const Orders = () => {
  const [orders, setOrderItems] = useState();
  const [loading,setLoading]=useState()

  useEffect(() => {
    setLoading(true)
    let userId = cookieCutter.get('userId');
    const token = cookieCutter.get('token');
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    getOrdersByUser(userId, requestOptions).then((data) => {
      setOrderItems(data?.orderDetails)
      setLoading(false)
    });

  }, []);

  return (
    <div className='orders'>
      <Loader {...{loading}} />
      {orders && orders.length > 0
        ?orders.map(order => (
          <div key={order._id}
            className='order-Item'>
            <div className='ordered-products'>
              {order && order?.products?.length > 0 &&
                order.products.map(prod => (
                  <OrderProducts
                    key={prod._id}
                    prodId={prod._id}
                    isfromOrders={true}
                    isDeliverd={prod?.isDeliverd}
                    address={order?.address}
                  />
                ))
                }
            </div>
          </div>
        )):
        <div className='emptyicon'>
        <img src="/images/noorder.png" alt="emptywishlist" width={400} height={400} />
        <div className='info'>No Order Placed Yet</div>
        <div className='actionBtn'>                      
            <Button
                    variant="contained"
                    color='success'
                    onClick={() => router.push({
                      pathname: '/'
                    })}
                    fullWidth
                  >
                    Return Home
                  </Button>
                  </div>
        </div>}
    </div>
  )
}

export default Orders