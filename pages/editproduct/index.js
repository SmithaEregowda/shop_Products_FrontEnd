import { Button, CircularProgress, Snackbar, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { addProduct, getProductById, updateProduct } from '../../services/productservices'
import { useRouter } from 'next/router'
import ProductFileds from '../../components/product/ProductFileds'

const EditProduct = () => {
  const [productObj, setProduct] = useState({})
  const [selectedFile, setFile] = useState()
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const updateproductInput = (e) => {
    setProduct({ ...productObj, [e.target.name]: e.target.value });
  }
  useEffect(()=>{
    const token = cookieCutter.get('token')
    const requestOptions={
      method:'GET',
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    getProductById(router.query.id,requestOptions).then((data) => {
      setLoading(false)
        setProduct(data?.product)
        setNotify(true);
        setMessage(data)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleCreate = () => {
    setLoading(true)
    const formData = new FormData();
    if(selectedFile){
      formData.append('productImg', selectedFile)
    }
    formData.append('title', productObj?.title)
    formData.append('subTitle', productObj?.subTitle)
    formData.append('price', productObj?.price)
    const token = cookieCutter.get('token')

    const headers = {
      Authorization: `Bearer ${token}`
    }

    updateProduct(router.query.id,headers, formData).then((data) => {
      setLoading(false)
        setFile(null)
        setNotify(true);
        setMessage(data)
    }
    )
  }

  const handlefile = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className='edit-product'>
      {loading && <CircularProgress />}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notify}
        autoHideDuration={3000}
        onClose={() => setNotify(false)}
        severity="success"
        message={message?.message}
        key={'top' + 'right'}
      />
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
          Edit Product
        </Button>
      </div>
    </div>
  )
}

export default EditProduct