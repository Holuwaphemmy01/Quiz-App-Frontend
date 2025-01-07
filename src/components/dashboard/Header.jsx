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
      </nav>
    </header>
  );
};

export default Header;
