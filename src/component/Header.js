import React from 'react';
import NavBar from './NavBar';

export default function Header({ userLoggedIn, handleAuth }) {
  return (
    <div className="header">
      <h1 className="main-title">User Auth</h1>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
    </div>
  );
}
