import axios from "../../utils/axiosConfig";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

//components
import RadioButtonOptions from "../RadioButtonOptions";
import InputField from "../InputFields"
import SelectField from "../SelectFields";
import Button from "../Buttons"

export const FinishExamInfo = ({ examTitle, examAutomatedScore }) => { 
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  
  const { examId } = useParams(); 

  const submitToTrue = async() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      };

      await axios.post(`/student/exams/${examId}/submit`, { examId }, config);
    } catch (error) {
      console.log(
        error.response?.data?.error ||
        error.response?.data ||
        error.message
      );
      alert(error.response?.data?.error || "Failed to submit = true");
    }

  }
  return (
    <>
      <div>
        <p>{examTitle}</p>
        <p>{examAutomatedScore}</p>
        <Button 
          label={'Done'}
          onClick={async() => {
            await submitToTrue();
            navigate('/student-entry')
          }} 
        />
      </div>
    </>

  )
}
 