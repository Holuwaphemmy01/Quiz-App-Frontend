import React from 'react';
import '../../styles/dashboard/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="circle">A</span>
        <span className="site-name">QuizApp</span>
      </div>
      <nav>
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Dashboard</button>
        <button className="nav-btn">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
