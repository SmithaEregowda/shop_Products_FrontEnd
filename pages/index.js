import { Avatar, Backdrop, Button, CircularProgress, Pagination, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteProductById, getAllProducts, getProductsByUserId } from '../services/productservices'
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router';
import { clearCart, getCartByUser, postCart } from '../services/cartservice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getwishlistByUser, postWishList } from '../services/wishlistsevice';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({})
  const userData = useSelector(state => state.user);
  const [userId, setuserId] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [wishListItems, setWishListItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState(false)
  const [notifydata, setMessage] = useState({})
  const router = useRouter();

  useEffect(() => {
    setuserId(cookieCutter.get('userId'))
    const token = cookieCutter.get('token')
    if(userData?.userType === "internal user" ){
      getProductsByUser();
    }
    if(userData?.userType==="external user"){
    getAllProductsAfterDelete(token);
    getCartByUserId(token, cookieCutter.get('userId'));
    getWishListByUserId(token, cookieCutter.get('userId'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.userType]);
  const getProductsByUser=()=>{
    const userId=cookieCutter.get('userId');
    const token = cookieCutter.get('token')
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    getProductsByUserId(userId,requestOptions)
      .then(data => {
        setProducts(data?.products)
        setPagination(data?.pagination)
      })
  }

  const getAllProductsAfterDelete = (token) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    getAllProducts(requestOptions)
      .then(data => {
        setProducts(data?.products)
        setPagination(data?.pagination)
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

  const handledelete = (id) => {
    const token = cookieCutter.get('token');
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    deleteProductById(id, requestOptions).then(data => {
      getProductsByUser();
    })
  }

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
      router.reload('/')
    })
  }

  const addtoWishListHandler = (prodId) => {
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

    postWishList(requestOptions).then((data) => {
      setMessage(data)
      setNotify(true)
      setLoading(false)
      router.reload('/')
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
      <div className='products'>
        {products && products.map(prod => (
          <div className='product-card' key={prod?._id}>
            {
              <div className='wishlist-Icon'>
                {userData?.userType === "internal user" ? "" :
                  (wishListItems && wishListItems.length > 0 &&
                    wishListItems.findIndex(p => p.productId.toString() === prod?._id) > -1) ?
                    <FavoriteIcon
                      onClick={() => { }}
                    />
                    :
                    <FavoriteBorderIcon
                      onClick={() => addtoWishListHandler(prod?._id)}
                    />

                }
              </div>
            }
            <div className='product-imgContainer'>
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: '#11cd6b' }}
                src={'http://localhost:8080/' + prod?.productImg}
                variant="square"
              />
            </div>
            <div className='product-title'>
              {prod?.title}
            </div>
            <div className='product-subTitle'>
              {prod?.subTitle}
            </div>
            <div className='product-price'>
              {prod?.price}
            </div>
            <div className='product-Actions'>
              {userData?.userType === "internal user" ?
                (
                    <div className='add-Delete'>
                      <Button
                        variant="contained"
                        color='success'
                        onClick={() => router.push({
                          pathname: 'editproduct',
                          query: { id: prod?._id }
                        })}
                        fullWidth
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color='error'
                        onClick={() => handledelete(prod?._id)}
                        fullWidth
                      >
                        DELETE
                      </Button>
                    </div>
                )
                :
                <div className='add-Delete'>
                  {
                    (cartItems && cartItems.length > 0 &&
                      cartItems.findIndex(p => p.product.toString() === prod?._id) > -1) ?
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
                        onClick={() => handleAddToCart(prod?._id)}
                        fullWidth
                      >
                        Add To Cart
                      </Button>
                  }

                  <Button
                    variant="contained"
                    color='error'
                    onClick={() => router.push({
                      pathname: 'checkout',
                      query: { id: prod?._id, isfromcart: false }
                    })}
                    fullWidth
                  >
                    BUY NOW
                  </Button>
                </div>
              }
            </div>
          </div>
        ))

        }
      </div>
      <div className='pagination'>
        {pagination &&
          <Pagination
            count={parseInt(pagination?.totalCount / pagination?.limit)}
            page={1}
            color='primary'
          />}
      </div>
    </div >
  )
}

export default HomePage