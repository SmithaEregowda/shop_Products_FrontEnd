/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { getwishlistByUser } from '../../services/wishlistsevice'
import { Backdrop, Button, CircularProgress, Snackbar } from '@mui/material'
import WishListProduct from '../../components/product/WishListProduct'
import { getCartByUser } from '../../services/cartservice';
import { Image } from '@mui/icons-material'
import { useRouter } from 'next/router';
const WishList = () => {
    const [wishListItems, setWishListItems] = useState([]);
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState(false)
    const router = useRouter();
    const [notifydata, setMessage] = useState({})
    useEffect(() => {
        const token = cookieCutter.get('token')
        const userId = cookieCutter.get('userId')
        getWishListByUserId(token, userId);
        getCartByUserId(token, userId);
    }, [])
    const getWishListByUserId = (token, user) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        getwishlistByUser(user, requestOptions).then((data) => {
            setWishListItems(data?.wishlist?.products)
        })
    }
   
    const getCartByUserId = (token, user) => {
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          },
        };
        getCartByUser(user, requestOptions).then((data) => {
          setCartItems(data?.cart?.products)
        })
      }

    return (
        <div className='products-details'>
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
            {wishListItems?.length>0 ?
            <div className='products'>
                { wishListItems.map(prod => (
                    <WishListProduct
                        key={prod?.productId}
                        prodId={prod?.productId}
                        cartItems={cartItems}
                        setLoading={setLoading}
                        setNotify={setNotify}
                        setMessage={setMessage}
                        getWishListByUserId={getWishListByUserId}
                    />
                ))}
            </div>:
            <div className='emptyicon'>
            <img src="/images/emptywishlist.jpg" alt="emptywishlist" width={400} height={400} />
            <div className='info'>No Items Found in Wishlist</div>
            <div className='actionBtn'>                      
                <Button
                        variant="contained"
                        color='success'
                        onClick={() => router.push({
                          pathname: '/'
                        })}
                        fullWidth
                      >
                        Add to WishList
                      </Button>
                      </div>
            </div>
        }
        </div>
    )
}

export default WishList