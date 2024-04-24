import React, { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { getAllUsers, removeUserById } from '../../services/usersevice';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SignUp from '../../components/signup';
import { useSnackbar } from 'notistack';
import Loader from '../../components/loader';


const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setuserId(cookieCutter.get('userId'))
    const token = cookieCutter.get('token')
    getAllusers(token)
  }, []);
  const getAllusers = (token) => {
    setLoading(true)
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    let query = 'filter=userType:internal user,userRole:normaladmin'
    getAllUsers(query, requestOptions)
      .then(data => {
        setUsers(data?.user)
        setLoading(false)
      })
  }

  const removeinternaluser=(user)=>{
    setLoading(true)
    const token = cookieCutter.get('token')
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    removeUserById(user?._id, requestOptions)
      .then(data => {
        setLoading(false)
                enqueueSnackbar(data?.message, 
                { variant:data?.status==200?'success':"error",
                anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
                getAllusers(token)
      })
  }

  return (
    <>
    <Loader loading={loading} />
    <div className='user-details'>
      <div className='createUser'>
        <Button
          variant="contained"
          color='success'
          onClick={() => setOpenModal(true)}
        //fullWidth
        >
          Create User
        </Button>
      </div>
      <div className='users'>
        {users && users.map(user => (
          <div className='user-card' key={user?._id}>
            <div className='user-imgContainer'>
              <Avatar
                sx={{ width: 50, height: 50, bgcolor: '#11cd6b' }}
                src={'https://shop-products-api.vercel.app/' + user?.imgurl}
                variant="square"
              />
            </div>
            <div className='user-name'>
              {user?.name}
            </div>
            <div className='user-email'>
              {user?.email}
            </div>
            <div className='user-prod'>
              Products:{user?.products?.length}
            </div>
            <div className='user-Actions'>
              <Button
                variant="contained"
                color='error'
                onClick={() => removeinternaluser(user)}
                fullWidth
              >
                Remove
              </Button>
            </div>
           
          </div>
        ))
        }
         <Dialog
              open={openModal}
              onClose={() => setOpenModal(false)}
              fullWidth
            >
              <DialogTitle className='dialogTitle'>
                {'Create Internal Users'}
                <IconButton
                  onClick={() => setOpenModal(false)}
                  className='closeIcon'
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <SignUp
                  //setLogin={setLogin}
                  setOpenModal={setOpenModal}
                  createinternalusers={true}
                />
              </DialogContent>
            </Dialog>
      </div>
      {/* <div className='pagination'>
        {pagination &&
          <Pagination
            count={pagination?.totalCount}
            page={1}
            color='primary'
          />}
      </div> */}
    </div>
    </>
  )
}

export default ManageUsers