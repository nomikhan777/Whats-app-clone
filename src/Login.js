import { Button } from '@mui/material'
import React from 'react'
import { auth, provider } from './firebase'
import { signInWithPopup } from 'firebase/auth'
import './Login.css'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
    const [{}, dispatch] = useStateValue();

    // Function to Sign In with google
    const signIn = () => {
        signInWithPopup(auth, provider).then(result => {
            console.log(result)
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user
            })
        }).catch(error => {
            alert(error.message);
        })
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt='' />
                <div className='login__text'>
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>Sign In with google</Button>
            </div>
        </div>
    )
}

export default Login