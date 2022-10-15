import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import Header from './component/Header';
import Home from './component/Home';
import Register from './component/Register';
import Login from './component/Login';
import Account from './component/Account';

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
      <Header userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
      <Route path="/" component={Home} exact />
      <Route path="/register" component={Register} />
      <Route
        path="/login"
        render={(props) => (
          <Login
            {...props}
            handleAuth={handleAuth}
          />
        )}
      />
      <Route path="/account" component={Account} />
    </div>
  );
}

export default App;
