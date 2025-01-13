import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../../styles/quiz/quiz.css';

const Quiz = ({ submitAnswers }) => {
  const location = useLocation();
  const { username, currentLevel: initialLevel } = location.state;

  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(80); 
  const [popup, setPopup] = useState({ show: false, message: '', isSuccess: false });
  const [currentLevel, setCurrentLevel] = useState(initialLevel);


  const [user, setUser] = useState({
    username: username,
    currentLevel: currentLevel,
  });

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8082/quiz/questions/${username}`);
      setQuestions(response.data);

      setSelectedOptions(new Array(response.data.length).fill(""));

    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [username, currentLevel]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[questionIndex] = option;
      return updated;
    });
  };

  



  const handleSubmit = async () => {
    try {
      const payload = {
        userName: username,
        selectedOptions,
      };
      console.log('Payload being sent:', payload);

      console.log(payload.selectedOptions.length);

      const response = await axios.post('http://localhost:8082/quiz', payload);
      console.log('Response from API:', response.data);
  
      if (response.data === 'Congratulation') {
        setPopup({ show: true, message: 'Congratulations! Proceed to the next level.', isSuccess: true });
      } else {
        setPopup({ show: true, message: response.data, isSuccess: false });
      }
    
    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      alert('There was an error submitting your answers. Please try again.');
    }
  
  };
  
  const handleNextLevel = () => {
    setCurrentLevel((prev) => prev + 1);
    setPopup({ show: false, message: '', isSuccess: true });
    setTimer(80); 
    loadQuestions();
  };

  const handleRetry = () => {
    setPopup({ show: false, message: '', isSuccess: false });
    setTimer(280); 
    loadQuestions();
  };

  
  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }


  const clearUserData = () => {
    setUser({
      username: '',
      currentLevel: 0,
    });
  };


  return (
    <div className="quiz">
      <Header clearUserData={clearUserData}/>
      <div className="quiz-content">
      <div className="level">Current Level: {currentLevel}</div>
        <div className="timer">
          Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
        </div>
        {questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <h3>
              {index + 1}. {question.question}
            </h3>
            <div className="options">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  className={`option-btn ${
                    selectedOptions[index] === option.option ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionSelect(index, option.option)}
                >
                  {option.option}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>

      {popup.show && (
        <div className="popup">
          <div className="popup-content">
            <p>{popup.message}</p>
            {popup.isSuccess ? (
              <button onClick={handleNextLevel}>Continue</button>
            ) : (
              <button onClick={handleRetry}>Retry</button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Quiz;

