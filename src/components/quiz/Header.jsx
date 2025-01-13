import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard/header.css';

const Header = ({clearUserData}) => {

  const navigate = useNavigate();


  const handleLogout = () => {
    clearUserData();
    navigate('/');
  };
  return (
    <header className="header">
      <div className="logo">
        <span className="circle">A</span>
        <span className="site-name">QuizApp</span>
      </div>
      <nav>
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Dashboard</button>
        <button onClick={handleLogout} className="nav-btn">Log Out</button>

      </nav>
    </header>
  );
};

export default Header;
