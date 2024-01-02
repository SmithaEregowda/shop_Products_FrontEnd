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
import Footersection from '../components/footer/footersection';
import CarouselComponent from '../components/carousel';
import Loader from '../components/loader';
import { useSnackbar } from 'notistack';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({})
  const userData = useSelector(state => state.user);
  const [userId, setuserId] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [wishListItems, setWishListItems] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const API_PATH='https://shop-products-api-1q6w.vercel.app';
  const [pageno,setPageNo]=useState(1);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true)
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
    const requestOptions = {
      method: 'GET',
    };
    let query={
      limit:10,
      pageNo:1
    }
    setPageNo(1)

    getAllProducts(requestOptions,query)
      .then(data => {
        setProducts(data?.products)
        setPagination(data?.pagination)
        setLoading(false)
      })

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

  const getAllProductsAfterDelete = (token,page) => {
    setLoading(true)
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    let pageNo=page?page:1;
    setPageNo(pageNo)
    let query={
      limit:10,
      pageNo:pageNo
    }
    getAllProducts(requestOptions,query)
      .then(data => {
        setProducts(data?.products)
        setPagination(data?.pagination)
        setLoading(false)
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
    setLoading(true)
    const token = cookieCutter.get('token');
    if(token){
      const payload = {
        userId: cookieCutter.get('userId'),
        prodId: prodId
      }
     
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
          { variant:'success',anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
        setLoading(false)
        router.reload('/')
      })
    }else{
      enqueueSnackbar("please Try to login", 
        { variant:'error',anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
        setLoading(false)
    }
    
  }

  const addtoWishListHandler = (prodId) => {
    setLoading(true)
    const token = cookieCutter.get('token');
    if(token){
      const payload = {
        userId: cookieCutter.get('userId'),
        prodId: prodId
      }
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      };
  
      postWishList(requestOptions).then((data) => {
        enqueueSnackbar(data?.message, 
          { variant:'success',anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
        setLoading(false)
        router.reload('/')
      })
    }else{
      enqueueSnackbar("please try to login", 
        { variant:'error',anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
      setLoading(false)
    }
  }

 const checkoutHandler=(prod)=>{
  const token = cookieCutter.get('token');
 if(token){
  router.push({
    pathname: 'checkout',
    query: { id: prod?._id, isfromcart: false }
  })
 }else{
  enqueueSnackbar("please try to login", 
    { variant:'error',anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
}
 }

 const onChangePage=(event,page)=>{
  console.log(page)
  setPageNo(page)
  const token = cookieCutter.get('token')
  getAllProductsAfterDelete(token,page);
 }

  return (
  <div style={{marginTop:"2rem"}}>
    <Loader loading={loading} />
      <CarouselComponent />
      <div className='products-details'>
      <div className='products'>
        {products && products.map(prod => (
          <div className='product-card' key={prod?._id}>
            {
              <div className='wishlist-Icon'>
                {(userData?.userType === "internal user"||!userData) ? "" :
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
                sx={{ width: "100%", height: 150, bgcolor: '#11cd6b' }}
                src={`${API_PATH}/` + prod?.productImg}
                variant="square"
              />
            </div>
            <div className="product-footer">
            <div className='product-title'>
              {prod?.title}
            </div>
            <div className='product-price'>
              RS.{prod?.price}
            </div>
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
                    onClick={()=>checkoutHandler(prod)}
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
            count={Math.ceil(pagination?.totalCount / pagination?.limit)}
            page={pageno}
            onChange={onChangePage}
            color='primary'
          />}
      </div>
     
    </div >
     <Footersection />
  </div>
  )
}

export default HomePage