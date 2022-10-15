import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        setEmailErr('')
        setPassword('')

        if (!email) {
            setEmailErr('Email field can not be empty')
        } else if (!email.match(validRegex)) {
            setEmailErr('Invalid email format')
        }

        if (!password) {
            setPasswordErr('Password field can not be empty')
        }

        if (email !== "" && password !== "") {
            const formData = {
                email: email,
                password: password
            }

            axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)
                .then((response) => {
                    const result = response.data

                    if (result.hasOwnProperty('errors')) { // Object.keys(result).includes('errors')
                        alert(`Failed to login , reason: ${result.errors}`)
                    } else {
                        alert('Logged in successfully')

                        localStorage.setItem('token', result.token)
                        props.history.push('/')
                        props.handleAuth()
                    }
                })
        }


    }

    const handleChange = (e) => {
        const input = e.target.value

        if (e.target.name === 'email') {
            setEmail(input)
        } else if (e.target.name === 'password') {
            setPassword(input)
        }
    }

    return (
        <div>
            <h2> Login </h2>

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='enter email'
                    value={email}
                    name='email'
                    onChange={handleChange}
                />
                {emailErr && <small style={{ color: 'red' }}> {emailErr} </small>}
                <br />

                <input
                    type='text'
                    placeholder='enter password'
                    value={password}
                    name='password'
                    onChange={handleChange}
                />
                {passwordErr && <small style={{ color: 'red' }}> {passwordErr} </small>}
                <br />

                <input
                    type='submit'
                    value='Login'
                />
            </form>
        </div>
    )
}

export default Login