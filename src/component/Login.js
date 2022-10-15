import React, { useState } from 'react';
import axios from 'axios';

import VALID_REGEX from '../constants';

function Login({ handleAuth, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailErr('');
    setPassword('');

    if (!email) {
      setEmailErr('Email field can not be empty');
    } else if (!email.match(VALID_REGEX)) {
      setEmailErr('Invalid email format');
    }

    if (!password) {
      setPasswordErr('Password field can not be empty');
    }

    if (email !== '' && password !== '') {
      const formData = {
        email,
        password,
      };

      axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)
        .then((response) => {
          const result = response.data;

          // eslint-disable-next-line no-prototype-builtins
          if (result.hasOwnProperty('errors')) { // Object.keys(result).includes('errors')
            alert(`Failed to login , reason: ${result.errors}`);
          } else {
            alert('Logged in successfully');

            localStorage.setItem('token', result.token);
            history.push('/');
            handleAuth();
          }
        });
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;

    if (e.target.name === 'email') {
      setEmail(input);
    } else if (e.target.name === 'password') {
      setPassword(input);
    }
  };

  return (
    <div>
      <h2> Login </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        {emailErr && (
        <small style={{ color: 'red' }}>
          {' '}
          {emailErr}
          {' '}
        </small>
        )}
        <br />

        <input
          type="text"
          placeholder="enter password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        {passwordErr && (
        <small style={{ color: 'red' }}>
          {' '}
          {passwordErr}
          {' '}
        </small>
        )}
        <br />

        <input
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
}

export default Login;
