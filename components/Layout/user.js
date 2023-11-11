import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import {CloseOutlined} from "@material-ui/icons";
import CloseIcon from '@mui/icons-material/Close';
import Login from '../login';
import SignUp from '../signup';
import { getUser } from '../../services/usersevice';
const UserData = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [authenticated, setAuth] = useState(false)
  const [openModal, setOpenModal] = React.useState(false);
  const router = useRouter();
  const [isLoginshow, setLogin] = useState(false)
  const userinfo = useSelector(state => state.user)
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const handleClick = (e) => {
    console.log(e.currentTarget)
    setAnchorEl(e.currentTarget);
  };
  useEffect(()=>{
    const token = cookieCutter.get('token')
    const userId = cookieCutter.get('userId')
    const requestOptions2 = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      }
  }
  getUser(userId, requestOptions2).then(data => {
    setAuth(data?.user);
      dispatch({ type: 'addUser', payload: data?.user})
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUser=(user)=>{
    setAuth(user);
    dispatch({ type: 'addUser', payload:user})
  }


  const handlesignup = () => {
    setOpenModal(true)
  }
  const handleLogout = () => {
    const token = cookieCutter.get('token')
    const userId = cookieCutter.get('userId')
    cookieCutter.set('token', token,
      { expires: new Date(0) }
    )
    cookieCutter.set('userId', userId, { expires: new Date(0) })
    dispatch({ type: 'addUser' }, {})
    router.push('/')
  }

  const handleProfile=()=>{
    router.push('profile')
  }
  return (
    <div>
      {userinfo?.name? 
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {
            userinfo?.imgurl?
            <Avatar 
          sx={{ width: 42, height: 32, bgcolor: '#11cd6b' }}
           src={'https://shop-products-api.vercel.app/'+userinfo?.imgurl}
           >
          </Avatar>:
          <Avatar 
          sx={{ width: 42, height: 32, bgcolor: '#11cd6b' }}
           >
            {userinfo?.name?.slice(0, 2)?.toUpperCase()}
          </Avatar>
          }
          
        </IconButton>
      </Tooltip>
        :
        <Button
          onClick={handlesignup}
          color='success'
        >
          Signup/Login
        </Button>
      }
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleProfile}>Profile</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Dialog 
      open={openModal} 
      onClose={handleClose}
      fullWidth
      >
        <DialogTitle className='dialogTitle'>
          {isLoginshow?'Login':'Signup'}
          <IconButton 
          onClick={() => setOpenModal(false)}
          className='closeIcon'
          >
              <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
          {isLoginshow ?
            <Login
              setLogin={setLogin}
              setOpenModal={setOpenModal}
              handleUser={handleUser}
            /> :
            <SignUp
              setLogin={setLogin}
              setOpenModal={setOpenModal}
            />
          }
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserData