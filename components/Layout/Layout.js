/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import UserData from './user';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { PERMISSIONS } from './constant';
import { useRouter } from 'next/router';
const Layout = ({ children }) => {
    const userdata = useSelector(state => state.user);
    const [permissions, setPermission] = useState([])
    const router=useRouter();
    const [scrollNumber,setScrollNum]=useState("default")
    const [shownavs,setShowNav]=useState(false)
    
    const changeNavcolor=()=>{
        setScrollNum(window.scrollY)
    }

    // window.addEventListener("scroll",changeNavcolor);

    useEffect(() => {
        if (userdata?.userType === "external user") {
            setPermission(PERMISSIONS?.ExternaUser)
        } else if(userdata?.userType === "internal user") {
            setPermission(PERMISSIONS?.InternalUser)
        }else{
            setPermission([])
        }
    }, [userdata])
    return (
        <div className='layout'>
            <div className={`layoutWrapper
        ${(scrollNumber>=3&&scrollNumber<=20)&&"sleep"}
        ${scrollNumber>20&&"scrolled"}`} >
                <div onClick={()=>router.push('/')} className='title'>
                    Veggies
                </div>
                <div className={"navIcon"}>
                <img 
                    src='images/navIcon.png' 
                    alt='navIcon' 
                    width={30}
                    height={50}
                    onClick={()=>setShowNav(!shownavs)}
                />
            </div>
                <div className={`leftItems ${shownavs&&"leftItemsgrid"}`}>
               <div className='layout-items'>
                            {permissions && permissions.length > 0 && permissions.map(item => (
                                <div key={item} onClick={()=>router.push(item)}>
                                    <Typography sx={{ minWidth: 100 }}>{item.toUpperCase()}</Typography>
                                </div>
                            ))}
                </div>
                <div className='signup-items'>
                    <UserData />
                </div>
               </div>
               
            </div>
            <div>{children}</div>
        </div>
    )
}

export default Layout