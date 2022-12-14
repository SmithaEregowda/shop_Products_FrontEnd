import React, { useState } from 'react'
import { Button, CircularProgress, Snackbar, TextField } from '@mui/material'
import { forgotpassword, getUser, login } from '../services/usersevice'
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
const Login = ({ setLogin, setOpenModal, handleUser }) => {
    const [loginObj, setloginObj] = useState({})
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState(false)
    const [notifydata, setMessage] = useState({})
    const [forgotPasswordflow, setFlow] = useState(false)
    const [forgotUser, setForgotUser] = useState('')
    const updateuserInput = (e) => {
        setloginObj({ ...loginObj, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch()
    const router = useRouter();
    const handleForm = () => {
        setLoading(true)
        setNotify(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginObj)
        };
        login(requestOptions).then(data => {
            setLoading(false)
            setMessage(data)
            if (data?.token && data?.user) {
                handleUser(data?.user)
                setOpenModal(false)
                cookieCutter.set('token', data?.token)
                cookieCutter.set('userId', data?.user)
                router.reload('/')
            }
        })
    }
    const handleforgot = () => {
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: forgotUser })
        };
        forgotpassword(requestOptions).then(data => {
            setLoading(false)
            setMessage(data)
            if (data?.link) {
                setOpenModal(false)
                router.push(data?.link)
            }
        })
    }
    return (
        <div className='form-Item'>
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
            {
                forgotPasswordflow ?
                    <div className='input-items'>
                        <div className='input-field'>
                            <TextField
                                id="outlined-basic"
                                placeholder="username"
                                name='username'
                                type={'email'}
                                variant="outlined"
                                autoComplete={"off"}
                                //InputProps={{ style: { fontSize: 13 } }}
                                onChange={(e) => setForgotUser(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </div> :
                    <div className='input-items'>
                        <div className='input-field'>
                            <TextField
                                id="outlined-basic"
                                placeholder="username"
                                name='username'
                                type={'email'}
                                variant="outlined"
                                autoComplete={"off"}
                                InputProps={{ style: { fontSize: 13 } }}
                                onChange={(e) => updateuserInput(e)}
                                fullWidth
                            />
                        </div>
                        <div className='input-field'>
                            <div className='forgotPassword' onClick={() => setFlow(true)}>
                                forgot password?</div>
                        </div>
                        <div className='input-field'>
                            <TextField
                                id="outlined-basic"
                                placeholder="password"
                                name='password'
                                type={'password'}
                                variant="outlined"
                                autoComplete={"off"}
                                InputProps={{ style: { fontSize: 13 } }}
                                onChange={(e) => updateuserInput(e)}
                                fullWidth
                            />
                        </div>
                    </div>
            }

            <div className='buttonActions'>
                <Button
                    variant="contained"
                    color='success'
                    onClick={forgotPasswordflow ? handleforgot : handleForm}
                >{forgotPasswordflow ? 'Send' : 'Login'} </Button>
            </div>
            <br />
            do not have a account?
            <Button
                color='success'
                onClick={() => setLogin(false)}
            >Signup</Button>

        </div>
    )
}

export default Login