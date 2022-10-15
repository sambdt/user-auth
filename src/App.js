import React, { useEffect, useState } from 'react';
import NavBar from './component/NavBar';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // to toggle login status
  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn);
  };

  // to handle page reload
  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleAuth();
    }
  }, []);

  return (
    <div>
      <h1> User Auth </h1>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
    </div>
  );
}

export default App;
