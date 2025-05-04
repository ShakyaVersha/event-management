import React, { useState } from 'react';
import Login from '../Login.jsx';
import SignIn from '../Signin.jsx';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");

  const openLogin = () => {
    setShowLogin(true);
    setShowSignIn(false);
  };

  const openSignIn = () => {
    setShowSignIn(true);
    setShowLogin(false);
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowSignIn(false);
  
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false); 
    navigate("/");
  };

  return (
    <>
      <div className='nav-container'>
        <div className="logp"><h1>Logo</h1></div>

        <div className="navItem">
          <li><Link to="/">Home</Link></li>
          {userRole === "user" ? (
            <li><Link to="/user-event">User Events</Link></li>
          ) : (
            <li><Link to="/event">Events</Link></li>
          )}
        </div>

        <div className='button-group'>
          

          {isLoggedIn ? (
            <button className='login-btn' onClick={handleLogout}>Logout</button>
          ) : (
            <button className='login-btn' onClick={openLogin}>Login</button>
          )}
        </div>
      </div>

      {/* Modal for Login */}
      {showLogin && (
        <Login
          onClose={closeModal}
          onSignInClick={openSignIn}
          onLoginSuccess={() => {
            setIsLoggedIn(true); 
            setShowLogin(false);
          }}
        />
      )}

      {/* Modal for SignIn */}
      {showSignIn && (
        <SignIn
          onClose={closeModal}
          onLoginClick={openLogin}
        />
      )}

    </>
  );
};

export default Navbar;
