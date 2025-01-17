import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Footer from './Footer';
import '../../styles/landingPage/landingPage.css'



const LandingPage =()=> {
   const [showLogin, setShowLogin] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
   const [username, setUsername] = useState('');
   const [currentLevel, setCurrentLevel] = useState('')
   const navigate = useNavigate();
 
   const openLogin = () => {
     setShowRegister(false);
     setShowLogin(true);
   };
 
   const openRegister = () => {
     setShowLogin(false);
     setShowRegister(true);
   };
 
   const closeForm = () => {
     setShowLogin(false);
     setShowRegister(false);
   };

   const onLoginSuccess =(username, currentLevel) =>{
     setUsername(username);
     setCurrentLevel(currentLevel);
     navigate('/dashboard', {state:{username, currentLevel}});
   }
 
   return (
     <div className='landingPage'>
       <Header openLogin={openLogin} openRegister={openRegister} />
       <Hero openRegister={openRegister} />
       {showLogin && (
         <div className='hero'>
           <div  className='hero-content'>
             <LoginForm closeForm={closeForm} openRegister={openRegister}  onLoginSuccess={onLoginSuccess}/>
           </div>
         </div>
       )}
       {showRegister && (
         <div className=''>
           <div className="">
             <RegisterForm closeForm={closeForm} openLogin={openLogin} />
           </div>
         </div>
       )} 
       <Footer />
     </div>
   );
 };

 
 export default LandingPage;