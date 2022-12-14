import React, { useState } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
const QuantityItem = ({ quantityNum,setQuantity ,price}) => {
 
    const quantityHandler = (mode) => {
       if(mode==="add"){
       if(!(quantityNum>9)){
        setQuantity(quantityNum+1)
       }
       }else{
        if(quantityNum>1){
            setQuantity(quantityNum-1)
        }
       }
    }
    return (
        <div className='cart-quantity'>
            <IndeterminateCheckBoxOutlinedIcon  onClick={()=>quantityHandler("reduce")}/>
            <input
                type={'number'}
                value={quantityNum}
                readOnly
            />
            <AddBoxOutlinedIcon onClick={()=>quantityHandler("add")} />
            <DragHandleIcon />
            <input
                type={'number'}
                value={price*quantityNum}
                readOnly
            />
        </div>
    )
}

export default QuantityItem