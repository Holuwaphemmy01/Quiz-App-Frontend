import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../../styles/landingPage/form.css';





const LoginForm = ({ closeForm, openRegister, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


    const handleLogin = async (e) =>{
      e.preventDefault();

    

      try{
        const response = await axios.post('http://localhost:8082/quiz/login', {username, password});
        console.log(response.data)
        
        const currentLoggedInUser = response.data;
        const currentLevel = currentLoggedInUser.currentLevel;
        onLoginSuccess(currentLoggedInUser.userName, currentLoggedInUser.currentLevel);        
      }
      catch(error){
        setError("Invalid username or password");
      }
    };



 

  return (
    <div className="form">
      <div className="form-content">
        <span className="close" onClick={closeForm}>&times;</span>
        <h2 className='login'>Login</h2>
        <form className='formPage' onSubmit={handleLogin}>
          <label htmlFor="username">Username </label>
          <input 
            type="text" 
            id="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"  
            required
          />
          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password" 
          required
          />
          {error && <p className="error-message">{error}</p>}
          <p>
            Don't have an account?{' '}
            <button type="button" className="link-button" onClick={openRegister}>
              Register Here
            </button>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
