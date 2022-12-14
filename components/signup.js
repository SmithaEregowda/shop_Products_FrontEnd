import React, { useState } from 'react'
import { Backdrop, Button, CircularProgress, Snackbar, TextField } from '@mui/material'
import { signup } from '../services/usersevice'
const SignUp = ({ setLogin, setOpenModal, createinternalusers }) => {
    const [signupObj, setSignupObj] = useState({})
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState(false)
    const [notifydata, setMessage] = useState({})
    const updateuserInput = (e) => {
        setSignupObj({ ...signupObj, [e.target.name]: e.target.value })
    }
    const handleForm = () => {
        setLoading(true)
        setNotify(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupObj)
        };
        signup(requestOptions).then(data => {
            setMessage(data)
            setLoading(false)
            if (data?.user && setLogin) {
                setLogin(true)
            }
            //setOpenModal(false)
        })
    }
    return (
        <div className='form-Item'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={notify}
                autoHideDuration={2000}
                onClose={() => setNotify(false)}
                severity="success"
                message={notifydata?.message}
                key={'top' + 'right'}
            />
            <div className='input-items'>
                <div className='input-field'>
                    <TextField
                        id="outlined-basic"
                        placeholder="Name"
                        name='name'
                        variant="outlined"
                        autoComplete={"off"}
                        InputProps={{ style: { fontSize: 13 } }}
                        onChange={(e) => updateuserInput(e)}
                    />
                </div>
                <div className='input-field'>
                    <TextField
                        id="outlined-basic"
                        placeholder="Email"
                        name='email'
                        type={'email'}
                        variant="outlined"
                        autoComplete={"off"}
                        InputProps={{ style: { fontSize: 13 } }}
                        onChange={(e) => updateuserInput(e)}
                    />
                </div>
                <div className='input-field'>
                    <TextField
                        id="outlined-basic"
                        placeholder="Mobile Number"
                        name='MobileNumber'
                        type={'number'}
                        variant="outlined"
                        autoComplete={"off"}
                        InputProps={{ style: { fontSize: 13 } }}
                        onChange={(e) => updateuserInput(e)}
                    />
                </div>
                <div className='input-field'>
                    <TextField
                        id="outlined-basic"
                        placeholder="Address"
                        name='Address'
                        variant="outlined"
                        autoComplete={"off"}
                        InputProps={{ style: { fontSize: 13 } }}
                        onChange={(e) => updateuserInput(e)}
                    />
                </div>

                {createinternalusers &&
                    <div className='input-field'>
                        <TextField
                            id="outlined-basic"
                            placeholder="User Type"
                            name='userType'
                            variant="outlined"
                            autoComplete={"off"}
                            InputProps={{ style: { fontSize: 13 } }}
                            onChange={(e) => updateuserInput(e)}
                        />
                    </div>
                }{createinternalusers &&
                    <div className='input-field'>
                        <TextField
                            id="outlined-basic"
                            placeholder="User Role"
                            name='userRole'
                            variant="outlined"
                            autoComplete={"off"}
                            InputProps={{ style: { fontSize: 13 } }}
                            onChange={(e) => updateuserInput(e)}
                        />
                    </div>
                }


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
                    />
                </div>
                <div className='input-field'>
                    <TextField
                        id="outlined-basic"
                        placeholder="Confirm password"
                        name='confirmPassword'
                        type={'password'}
                        variant="outlined"
                        autoComplete={"off"}
                        InputProps={{ style: { fontSize: 13 } }}
                        onChange={(e) => updateuserInput(e)}
                    />

                </div>
            </div>
            <div className='buttonActions'>
                <Button
                    variant="contained"
                    color='success'
                    onClick={handleForm}
                >{createinternalusers?'Create User':'Sign Up'}</Button>&nbsp;
            </div>
            {!createinternalusers&& 'Alerady have a account?'}
           {!createinternalusers&&
            <Button
                color='success'
                onClick={() => setLogin(true)}
            >Login</Button>}

        </div>
    )
}

export default SignUp