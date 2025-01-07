import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
      
      </Routes>
    </Router>
  )
  
    
}

export default App
