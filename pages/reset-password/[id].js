import { Button, CircularProgress, Snackbar, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { resetPassword } from '../../services/usersevice'
const ResetPassword = () => {
  const router = useRouter()
  const [curPassword, setCurrent] = useState('')
  const [newPassword, setNew] = useState('')
  const [cnfPassword, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState(false)
  const [notifydata, setMessage] = useState({})
  const { id } = router.query
  const handleReset = () => {
    setLoading(true)
    setNotify(true)
    if (newPassword !== cnfPassword) {
      setLoading(false)
      setNotify(false)
      alert('password does not match');
      return;
    }
    let data = {
      password: curPassword,
      newPassword: newPassword,
      userId: cookieCutter.get('userId')
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    resetPassword(requestOptions,id).then(data => {
      setLoading(false)
      setMessage(data)
      if (data?.token && data?.user) {
        handleUser(data?.user)
        setOpenModal(false)
        cookieCutter.set('token', data?.token)
        cookieCutter.set('userId', data?.user)
        router.push('/')
      }
    })
  }
  return (
    <div className='reser-password'>
      {loading && <CircularProgress />}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notify}
        autoHideDuration={3000}
        onClose={() => setNotify(false)}
        severity="success"
        message={notifydata?.message}
        key={'top' + 'right'}
      />
      <div className='input-items'>
        <div className='input-field'>
          <TextField
            id="outlined-basic"
            label="current password"
            name='password'
            type={'password'}
            variant="outlined"
            autoComplete={"off"}
            InputProps={{ style: { fontSize: 10 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
            onChange={(e) => setCurrent(e.target.value)}
            fullWidth
          />
        </div>
        <div className='input-field'>
          <TextField
            id="outlined-basic"
            label="new password"
            name='newPassword'
            type={'password'}
            variant="outlined"
            autoComplete={"off"}
            InputProps={{ style: { fontSize: 10 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
            onChange={(e) => setNew(e.target.value)}
            fullWidth
          />
        </div>
        <div className='input-field'>
          <TextField
            id="outlined-basic"
            label="confirm password"
            name='cnfPassword'
            type={'password'}
            variant="outlined"
            autoComplete={"off"}
            InputProps={{ style: { fontSize: 10 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
            onChange={(e) => setConfirm(e.target.value)}
            fullWidth
          />
        </div>
        <div className='buttonActions'>
          <Button
            variant="contained"
            color='success'
            onClick={handleReset}
          >reset </Button>
        </div>
      </div>

    </div>
  )
}

export default ResetPassword