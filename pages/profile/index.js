import { Avatar, Button, CircularProgress, IconButton, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cookieCutter from 'cookie-cutter'
import { updateUser } from '../../services/usersevice'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
const UserProfile = () => {
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [profileObj, setprofileObj] = useState(userData ? userData : {})
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState('')
  const [selectedFile ,setFile]=useState()
  useEffect(() => {
    setprofileObj(userData)
  }, [userData])
  const updateuserInput = (e) => {
    setprofileObj({ ...profileObj, [e.target.name]: e.target.value })
  }

  const handleUpdate = () => {
    setLoading(true)
    
    const formData=new FormData();
   if(selectedFile){
    formData.append('imgurl',selectedFile)
   }
   formData.append('name', profileObj?.name)
   formData.append('email', profileObj?.email)
   formData.append('MobileNumber',profileObj?.MobileNumber)
   formData.append('Address',profileObj?.Address)
    const token = cookieCutter.get('token')
    const userId = cookieCutter.get('userId')
    const headers={
      Authorization: `Bearer ${token}`
    }
  
    updateUser(headers,formData, userId).then((data) => {
      setLoading(false)
      if (data?.user) {
        setFile(null)
        setNotify(true);
        setMessage(data)
        setprofileObj(data?.user)
        dispatch({ type: 'addUser', payload: data?.user })
      }
    }
    )
  }
 const handlefile=(e)=>{
  setFile(e.target.files[0])
 }
  return (
    <div className='profile'>
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
      <div className='profile-info'>
        <div className='user-profile-section'>
          <div className='user-profile'>
            {
              userData?.imgurl ?

                <div>
                  <Avatar
                    sx={{ width: 100, height: 100, bgcolor: '#11cd6b' }}
                    src={'http://localhost:8080/' + userData?.imgurl}
                  >

                  </Avatar>
                  <IconButton 
                  //color="primary"
                   aria-label="upload picture" 
                   component="label"
                   style={{color:"#ccc"}}
                   className='uploadBtn'
                   >
                    <input hidden accept="image/*" type="file" onChange={handlefile} />
                    <PhotoCameraIcon  />
                  </IconButton>
                </div>
                :
                <Button>
                  <Avatar sx={{ width: 72, height: 72, bgcolor: '#11cd6b' }}>
                    {userData?.name?.slice(0, 2)?.toUpperCase()}
                  </Avatar>
                </Button>
            }

          </div>
          <div className='user-details'>
            <div className='input-field'>
              <TextField
                id="outlined-basic"
                placeholder="Title"
                name='title'
                type={'text'}
                variant="outlined"
                autoComplete={"off"}
                defaultValue={profileObj?.title}
                onChange={(e) => updateuserInput(e)}
                fullWidth
              />
            </div>
            <div className='input-field'>
              <TextField
                id="outlined-basic"
                placeholder="Description"
                name='description'
                type={'text'}
                defaultValue={profileObj?.description}
                variant="outlined"
                autoComplete={"off"}
                onChange={(e) => updateuserInput(e)}
                fullWidth
                multiline
                rows={5}
              />
            </div>
          </div>
        </div>
        <div className='user-data'>
          <div className='input-field'>
            <TextField
              id="outlined-basic"
              name='name'
              placeholder='name'
              variant="outlined"
              autoComplete={"off"}
              value={profileObj?.name}
              onChange={(e) => updateuserInput(e)}
              fullWidth
            />
          </div>
          <div className='input-field'>
            <TextField
              id="outlined-basic"
              name='email'
              placeholder='email'
              type={'email'}
              value={profileObj?.email}
              variant="outlined"
              autoComplete={"off"}
              onChange={(e) => updateuserInput(e)}
              fullWidth
            />
          </div>
          <div className='input-field'>
            <TextField
              id="outlined-basic"
              placeholder='mobile number'
              name='MobileNumber'
              type={'number'}
              value={profileObj?.MobileNumber}
              variant="outlined"
              autoComplete={"off"}
              onChange={(e) => updateuserInput(e)}
              fullWidth
            />
          </div>
          <div className='input-field'>
            <TextField
              id="outlined-basic"
              name='Address'
              placeholder='address'
              type={'text'}
              variant="outlined"
              value={profileObj?.Address}
              autoComplete={"off"}
              onChange={(e) => updateuserInput(e)}
              fullWidth
            />
          </div>
          <div className='input-field'>
            <TextField
              id="outlined-basic"
              name='password'
              placeholder='password'
              type={'password'}
              value={profileObj?.password}
              variant="outlined"
              autoComplete={"off"}
              InputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              onChange={(e) => updateuserInput(e)}
              fullWidth
              disabled
            />
          </div>
        </div>
      </div>
      <div className='profile-action'>
        <Button
          variant="contained"
          color='success'
          onClick={handleUpdate}
          fullWidth
        >
          Update
        </Button>
      </div>
    </div>

  )
}

export default UserProfile