import { Avatar, TextField } from '@mui/material'
import React from 'react'

const ProductFileds = ({ productObj, handlefile, updateproductInput }) => {
  console.log(productObj)
  return (
    <div className='add-fileds'>
      <div className='input-field' >
      {productObj?.productImg&&
      <Avatar
      sx={{ width: 50, height: 50, bgcolor: '#11cd6b' }}
      src={'https://shop-products-api.vercel.app/' + productObj?.productImg}
      variant="square"
    />
    }
      </div>
      <div className='input-field'>
        <TextField
          id="outlined-basic"
          placeholder="Product Image"
          name='productImg'
          type={'file'}
          variant="outlined"
          autoComplete={"off"}
          //defaultValue={productObj?.title}
          onChange={handlefile}
          fullWidth
        />
      </div>
      <div className='input-field'>
        <TextField
          id="outlined-basic"
          placeholder="Title"
          name='title'
          type={'text'}
          variant="outlined"
          autoComplete={"off"}
          value={productObj?.title}
          onChange={(e) => updateproductInput(e)}
          fullWidth
        />
      </div>
      <div className='input-field'>
        <TextField
          id="outlined-basic"
          placeholder="Sub Title"
          name='subTitle'
          type={'text'}
          variant="outlined"
          autoComplete={"off"}
          value={productObj?.subTitle}
          onChange={(e) => updateproductInput(e)}
          fullWidth
        />
      </div>
      <div className='input-field'>
        <TextField
          id="outlined-basic"
          placeholder="price"
          name='price'
          type={'text'}
          variant="outlined"
          autoComplete={"off"}
          value={productObj?.price}
          onChange={(e) => updateproductInput(e)}
          fullWidth
        />
      </div>
    </div>
  )
}

export default ProductFileds