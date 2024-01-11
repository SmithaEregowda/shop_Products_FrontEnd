import { Button,  TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, {  useState } from 'react'
import cookieCutter from 'cookie-cutter'
import { resetPassword } from '../../services/usersevice'
import Loader from '../../components/loader'
import { useSnackbar } from 'notistack'
const ResetPassword = () => {
  const router = useRouter()
  const [curPassword, setCurrent] = useState('')
  const [newPassword, setNew] = useState('')
  const [cnfPassword, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const handleReset = () => {
    if (newPassword !== cnfPassword) {
      setLoading(false)
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
      enqueueSnackbar(data?.message, 
        { variant:data?.status==200?'success':"error",anchorOrigin:{ vertical: 'top', horizontal: 'right' } });
      setLoading(false)
      if(data?.message==="password reseted  successfully"){
        router.push('/index');
      }
    })
  }
  

  return (
    <div className='reser-password'>
      <Loader loading={loading} />
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