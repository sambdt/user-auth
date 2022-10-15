import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function ListItem({ onClick, to, text }) {
  return (
    <li className="navbar-list-item">
      <Link to={to} onClick={onClick}>{text}</Link>
    </li>
  );
}

function NavBar({ userLoggedIn, handleAuth, history }) {
  return (
    <ul className="navbar-list">
      <ListItem to="/" text="Home" />
      {
            userLoggedIn ? (
              <>
                <ListItem to="/account" text="Account" />
                <ListItem to="/notes" text="My Notes" />
                <ListItem
                  onClick={() => {
                    localStorage.removeItem('token');
                    alert('Logged out successfully');
                    handleAuth();
                    history.push('/');
                  }}
                  text="Logout"
                />
              </>
            ) : (
              <>
                <ListItem to="/register" text="Register" />
                <ListItem to="/login" text="Login" />
              </>
            )
        }
    </ul>
  );
}

// const WrappedComponent = withRouter(NavBar)
// export default WrappedComponent
export default withRouter(NavBar);
