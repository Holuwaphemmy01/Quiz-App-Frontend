import React, { useState, useEffect } from 'react';
import '../../styles/landingPage/hero.css';

const Hero = ({ openRegister }) => {
  const captions = [
    { text: "Unlock Your Tech Genius—One Question at a Time." },
    { text: "Where Innovation Meets Knowledge—Test Your Tech Skills!" },
    { text: "Level Up Your Tech IQ—Are You Ready to Play?" },
    { text: "Dive Into the Future of Tech—Quiz Your Way to the Top!" },
    { text: "Challenge Your Mind, Master the Tech World!" },
    { text: "From Circuitry to Software—The Ultimate Tech Quiz Awaits!" },
    { text: "Tech Trivia for the Bold—How Smart Are You?" },
    { text: "Become the Ultimate Tech Guru—Start the Quiz Now!" },
    { text: "Answer. Score. Conquer. Your Tech Quiz Journey Starts Here!" },
    { text: "Geek Chic? Prove It with Every Question!" },
  ];

  const [currentCaption, setCurrentCaption] = useState(captions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * captions.length);
      setCurrentCaption(captions[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-caption">{currentCaption.text}</h1>
        <button onClick={openRegister} className="btn-main">Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
