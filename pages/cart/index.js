/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { getCartByUser } from '../../services/cartservice';
import { Avatar, Backdrop, Button, CircularProgress, Pagination, Snackbar } from '@mui/material';
import { getProductById } from '../../services/productservices';
import { useRouter } from 'next/router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartProduct from '../../components/product/cartProduct';
const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState(false)
    const [notifydata, setMessage] = useState({})
    const router = useRouter();
    useEffect(() => {
        let userId = cookieCutter.get('userId');
        const token = cookieCutter.get('token');
        getCartByUserId(token, userId)
    }, [])
    
    const getCartByUserId = (token, user) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        getCartByUser(user, requestOptions).then((data) => {
            let products = data?.cart?.products;
            setCartItems(data?.cart)
        })
    }

    const handeleMovetoCart = () => {
        router.push({
            pathname: 'checkout',
            query: {
                isfromcart: true
            }
        })
    }

    return (
        <div className='cart-details'>
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

            {cartItems?.products?.length>0&&
            <div className='cartIcon'>
                <ShoppingCartIcon 
                    color="success"
                    sx={{ fontSize: 70 }}
                    className="iconCart"
                />
                <div className='title'>Cart({cartItems?.products?.length?cartItems?.products?.length:0})</div>
            </div>}

            {cartItems?.products?.length>0?
                <div>
                    <div className='cart-Items'>
                        {
                        cartItems && cartItems?.products?.length > 0
                        && cartItems.products.map(prod => (
                            <CartProduct
                                key={prod.product}
                                prodId={prod.product}
                                quantity={prod?.quantity}
                                getCartByUserId={getCartByUserId}
                            />
                        ))}
            </div>
            <div className='buynowItem'>
                <Button
                    variant="contained"
                    color='success'
                    onClick={handeleMovetoCart}
                    fullWidth
                >
                    CheckOut
                </Button>
            </div>
                </div>:
                <div className='emptyicon'>
                    <img src="/images/emptycart.jpg" alt="emptywishlist" width={400} height={400} />
                    <div className='info'>No Items Found in Cart</div>
                    <div className='actionBtn'>                      
                        <Button
                        variant="contained"
                        color='success'
                        onClick={() => router.push({
                          pathname: '/'
                        })}
                        fullWidth
                      >
                        Add to Cart
                      </Button>
                      </div>
                </div>
            }
            
        </div>
    )
}

export default Cart