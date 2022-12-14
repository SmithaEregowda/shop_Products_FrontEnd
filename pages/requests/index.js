import { Avatar, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material'
import React, { useEffect , useState} from 'react'
import cookieCutter from 'cookie-cutter'
import ReqProduct from '../../components/product/ReqProduct';
import { getRequestByUser, processRequest } from '../../services/productservices';

const  Requests = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState(false)
  const [notifydata, setMessage] = useState({})

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
      setMessage(data);
      setNotify(true)
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