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
  return (
    <>
      <div>
        <p>{examTitle}</p>
        <p>{examAutomatedScore}</p>
        <Button 
          label={'Done'}
          onClick={() => navigate('/student-entry')} 
        />
      </div>
    </>

  )
}
