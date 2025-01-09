import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Timer from './Timer';
import '../../styles/quiz/quiz.css';
import axios from 'axios';

const Quiz = () => {
  const location = useLocation();
  const { username, currentLevel } = location.state;
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        console.log(username);
        const data = await axios.get('http://localhost:8081/quiz/questions', (username));
        console.log(data.data)
        setQuestions(data.questions);
      } catch (error) {
        console.error('Failed to load questions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [username, currentLevel]);

  const handleOptionSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = async () => {
    const concatenatedAnswers = Object.values(answers).join(',');
    try {
      const result = await submitAnswers(username, currentLevel, concatenatedAnswers);
      navigate('/results', { state: { result } }); // Navigate to a results page
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  if (loading) {
    return <div className="quiz-loading">Loading questions...</div>;
  }

  return (
    <div className="quiz-container">
      <Timer duration={180} onTimeUp={handleSubmit} />
      <h2>Level {currentLevel} Quiz</h2>
      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <h3>{index + 1}. {question.text}</h3>
            <div className="options">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  className={`option-btn ${answers[question.id] === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(question.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default Quiz;
