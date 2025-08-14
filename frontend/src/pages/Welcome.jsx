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
    <div>
      welome page
      <br/>
      somethings here about sa school
    </div>
    <div>
      <p>Role: </p>
      <Button label="Teacher" onClick={() =>{ navigate("/register/teacher") }}/>
      <Button label="Student" onClick={() =>{ navigate("/register/student") }}/>
    </div>
    
    </>
  )
}

export default Welcome;