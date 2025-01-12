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
  const [timer, setTimer] = useState(20); // Timer in seconds
  const [popup, setPopup] = useState({ show: false, message: '', isSuccess: false });
  const [currentLevel, setCurrentLevel] = useState(initialLevel);

  // Load questions
  const loadQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8082/quiz/questions/${username}`);
      setQuestions(response.data);

      // Reset selected options for the new set of questions
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

  // Timer logic
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

  // Handle option selection
  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions((prev) => {
      const updated = [...prev];
      updated[questionIndex] = option;
      return updated;
    });
  };

  // Submit answers
  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       userName: username,
  //       selectedOptions,
  //     };
  //     console.log(payload);
  //     const response = await axios.post('http://localhost:8082/quiz', payload);

  //     if (response.data === 'congratulations') {
  //       setPopup({ show: true, message: 'Congratulations! Proceed to the next level.', isSuccess: true });
  //     } else {
  //       setPopup({ show: true, message: response, isSuccess: false });
  //     }
  //   } catch (error) {
  //     console.error('Failed to submit answers:', error);
  //     alert('There was an error submitting your answers. Please try again.');
  //   }
  // };


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
  
      if (response.data === 'congratulations') {
        setPopup({ show: true, message: 'Congratulations! Proceed to the next level.', isSuccess: true });
      } else {
        setPopup({ show: true, message: response.data, isSuccess: false });
      }
    
    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      alert('There was an error submitting your answers. Please try again.');
    }
  
  };
  
  // Handle next level
  const handleNextLevel = () => {
    setCurrentLevel((prev) => prev + 1);
    setPopup({ show: false, message: '', isSuccess: true });
    loadQuestions();
  };

  // Handle retry
  const handleRetry = () => {
    setPopup({ show: false, message: '', isSuccess: false });
    loadQuestions();
  };

  // Loading state
  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div className="quiz">
      <Header />
      <div className="quiz-content">
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

      {/* Popup Modal */}
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
