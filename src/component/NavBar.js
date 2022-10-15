import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function NavBar({ userLoggedIn, handleAuth, history }) {
  return (
    <ul>
      <li>
        <Link to="/"> Home </Link>
      </li>
      {
            userLoggedIn ? (
              <>
                <li>
                  <Link to="/account"> Account </Link>
                </li>
                <li>
                  <Link onClick={() => {
                    localStorage.removeItem('token');
                    alert('Logged out successfully');
                    handleAuth();
                    history.push('/');
                  }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )
        }
    </ul>
  );
}

// const WrappedComponent = withRouter(NavBar)
// export default WrappedComponent
export default withRouter(NavBar);
