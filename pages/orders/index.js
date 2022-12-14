import React, { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { getOrdersByUser } from '../../services/orderservide';
import OrderProducts from '../../components/product/OrderProducts';

const Orders = () => {
  const [orders, setOrderItems] = useState();

  useEffect(() => {
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
    });

  }, []);

  return (
    <div className='orders'>
      {orders && orders.length > 0
        && orders.map(order => (
          <div key={order._id}
            className='order-Item'>
            <div >
            Order Id: {order?._id}
            </div>
            <div className='ordered-products'>
              {order && order.products.length > 0 &&
                order.products.map(prod => (
                  <OrderProducts
                    key={prod._id}
                    prodId={prod._id}
                    isfromOrders={true}
                    isDeliverd={prod?.isDeliverd}
                  />
                ))}
            </div>
            <div>
              Address  &nbsp; : &nbsp; &nbsp;{order?.Address}<br /><br />
              Price &nbsp; : &nbsp; &nbsp;{order?.totalPrice}<br /><br />
              payment mode &nbsp; : &nbsp; &nbsp;{order?.PayMentMode}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Orders