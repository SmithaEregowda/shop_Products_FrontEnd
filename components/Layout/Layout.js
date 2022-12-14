import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UserData from './user';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { PERMISSIONS } from './constant';
import { useRouter } from 'next/router';
const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Layout = ({ children }) => {
    const userdata = useSelector(state => state.user);
    const [permissions, setPermission] = useState([])
    const router=useRouter();
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
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Item>
                        <div onClick={()=>router.push('/')} className='title'>
                            Veggies
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                        <div className='layout-items'>
                            {permissions && permissions.length > 0 && permissions.map(item => (
                                <div key={item} onClick={()=>router.push(item)}>
                                    <Typography sx={{ minWidth: 100 }}>{item.toUpperCase()}</Typography>
                                </div>
                            ))}
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>
                        <UserData />
                    </Item>
                </Grid>
            </Grid>
            <div>{children}</div>
        </div>
    )
}

export default Layout