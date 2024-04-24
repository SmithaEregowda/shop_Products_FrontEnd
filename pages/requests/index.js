import { Avatar, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material'
import React, { useEffect , useState} from 'react'
import cookieCutter from 'cookie-cutter'
import ReqProduct from '../../components/product/ReqProduct';
import { getRequestByUser, processRequest } from '../../services/productservices';
import Loader from '../../components/loader';
import { useSnackbar } from 'notistack';

const  Requests = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = cookieCutter.get('token');
    const requestOptions = {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`
      },
  };
    getRequestByUser(cookieCutter.get('userId'),requestOptions)
    .then((data)=>{
      setProducts(data?.productReqs);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequest=(requestoptionsProcess)=>{
    setLoading(true);
    processRequest(requestoptionsProcess).then((data)=>{
      enqueueSnackbar(data?.message, 
        { variant:data?.status==200||data?.status==201?'success':"error",anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
      const token = cookieCutter.get('token');
      const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
      getRequestByUser(cookieCutter.get('userId'),requestOptions)
      .then((data)=>{
        setLoading(false)
        setProducts(data?.productReqs);
      })
      setLoading(false)
    })
    
  }


  return (
    <div className='products-details'>
      <Loader loading={loading} />
      <div className='products'>
        {products && products.map(prod => (
         <ReqProduct 
          key={prod?.reQusetedProd}
          prodId={prod?.reQusetedProd}
          isDeliverd={prod?.DeliverySatus}
          requestedUser={prod?.requesterUserId}
          orderId={prod?.orderId}
          requestId={prod?._id}
          processRequest={handleRequest}
         />
        ))

        }
      </div>
    </div >
  )
}

export default  Requests