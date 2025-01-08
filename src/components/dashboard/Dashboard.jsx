import React from 'react';
import Header from './Header'; 
import Footer from './Footer'; 
import '../../styles/dashboard/dashboard.css';

const Dashboard = ({ username, currentLevel, startQuiz }) => {
  return (
    <div className="dashboard">
      <Header />
      <section className="welcome-section">
        <h1>Welcome, {username}!</h1>
        <p>Your current level is: <span className="current-level">Level {currentLevel}</span></p>
      </section>

      <section className="level-section">
        <div className="level-info">
          <h2>Level {currentLevel}</h2>
          <p>Ready to test your tech knowledge and level up?</p>
        </div>
        <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
