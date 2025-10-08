import axios from "../utils/axiosConfig.js";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext.jsx";

//components
import Button from "../components/Buttons.jsx";

function Welcome() {
  const navigate = useNavigate();
  return (
    <>
    <div class="welcome-page-body">
    < div class="welcome-page-container">
        <h1 class="welcome-page-title">Welcome To INsys</h1>
      
        <div class="welcome-page-greeting">Your Web-Based Examination Platform</div>

        <div class="welcome-page-role-section">
          <div class="welcome-page-role-label">Select your role to continue</div>
          <div class="welcome-page-role-buttons">
              
              
            <button onClick={() =>{ navigate("/register/teacher") }} class="welcome-page-role-button">
              <i class="fa-solid fa-graduation-cap welcome-page-role-icon"></i>
              <div class="welcome-page-role-text">Teacher</div>
            </button>
            
            
            <button onClick={() =>{ navigate("/register/student") }} class="welcome-page-role-button">
              <i class="fa-solid fa-book-open welcome-page-role-icon"></i>
              <div class="welcome-page-role-text">Student</div>
            </button>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Welcome;