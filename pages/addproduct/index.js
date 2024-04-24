import { Button, CircularProgress, Snackbar, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { addProduct } from '../../services/productservices'
import { useRouter } from 'next/router'
import ProductFileds from '../../components/product/ProductFileds'
import Loader from '../../components/loader'
import { useSnackbar } from 'notistack'

const AddProduct = () => {
  const [productObj, setProduct] = useState({})
  const [selectedFile, setFile] = useState()
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const updateproductInput = (e) => {
    setProduct({ ...productObj, [e.target.name]: e.target.value });
  }
  const handleCreate = () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('productImg', selectedFile)
    formData.append('title', productObj?.title)
    formData.append('subTitle', productObj?.subTitle)
    formData.append('price', productObj?.price)
    const token = cookieCutter.get('token')

    const headers = {
      Authorization: `Bearer ${token}`
    }

    addProduct(headers, formData).then((data) => {
      setLoading(false)
      enqueueSnackbar(data?.message, 
        { variant:data?.status==200?'success':"error",
        anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
        if(data?.status===200){
          setFile(null)
          setNotify(true);
          setMessage(data)
          router.push('/')
        }
    }
    )
  }

  const handlefile = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className='addprodUser'>
       <Loader loading={loading} />
      <div className='add-product'>
     <div >
     <ProductFileds
        productObj={productObj}
        updateproductInput={updateproductInput}
        handlefile={handlefile}
      />
      <div className='btnActions'>
        <Button
          variant="contained"
          color='success'
          onClick={handleCreate}

        //fullWidth
        >
          Add Product
        </Button>
      </div>
     </div>
    </div>
    </div>
  )
}

export default AddProduct