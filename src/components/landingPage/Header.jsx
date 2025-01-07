import React from 'react';
import '../../styles/landingPage/header.css';

const Header = ({ openLogin, openRegister }) => {
  return (
    <header className="header">
      <div className="logo">
        <span className="circle">TQ</span>
        <span className="site-name">Tech Quiz</span>
      </div>
      <nav>
        <button id="login" className="nav-btn" onClick={openLogin}>Login</button>
        <button id="register" className="nav-btn" onClick={openRegister}>Register</button>
        <button id="get-started" className="get-started-btn" onClick={openRegister}>Get Started</button>
      </nav>
    </header>
  );
};

export default Header;
