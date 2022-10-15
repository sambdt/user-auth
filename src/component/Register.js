/* eslint-disable no-alert */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

function Register({ history }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmailErr('');
    setPasswordErr('');
    setUsernameErr('');

    let error = false;
    if (!username) {
      setUsernameErr('Username can not be empty');
      error = true;
    }

    if (!email) {
      error = true;
      setEmailErr('Email field can not be empty');
    } else if (!email.match(validRegex)) {
      error = true;
      setEmailErr('Invalid email format');
    }

    if (!password) {
      error = true;
      setPasswordErr('Password field can not be empty');
    }

    if (!error) {
      const formData = {
        username,
        email,
        password,
      };

      axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
        .then((response) => {
          const result = response.data;

          if (result?.hasOwnProperty('errors')) {
            alert(`Failed to created account , reason : ${result.message}`);
          } else {
            alert('Account is created successfully');
            history.push('/login');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;

    if (e.target.name === 'username') {
      setUsername(input);
    } else if (e.target.name === 'email') {
      setEmail(input);
    } else if (e.target.name === 'password') {
      setPassword(input);
    }
  };

  return (
    <div>
      <h2> Register with us</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter username"
          value={username}
          name="username"
          onChange={handleChange}
        />
        {usernameErr && (
        <small style={{ color: 'red' }}>
          {' '}
          {usernameErr}
          {' '}
        </small>
        )}
        <br />

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
        {' '}
        <br />

        <input
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
}

export default Register;
