import Button from '../../components/Buttons.jsx'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axiosConfig.js';
import { useAuth } from '../../context/AuthContext.jsx';

import InputField from '../InputFields.jsx';





function EnterExam() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [inputExamCode, setInputExamCode] = useState('');
  const [inputExamSection, setInputExamSection] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleEnterCode = async () =>  {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };
    try {
      await axios.post(`/student/verify`, {inputCode: inputExamCode, inputSection: inputExamSection}, config)

      setIsVerified(true);
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  }
  
  return (
    <>
    {!isVerified ? (
      <>
      <InputField 
        label="Code: "
        name="code"
        value={inputExamCode} 
        onChange={(e) => setInputExamCode(e.target.value)}
        placeholder="Enter exam code"
      />
      <InputField 
        label="Section: "
        name="section"
        value={inputExamSection} 
        onChange={(e) => setInputExamSection(e.target.value)}
        placeholder="Enter your section"
      />
      <Button label="Enter" onClick={handleEnterCode} />
      </>
    ) : (
      <>
      <div>
        <h2>Exam Instructions</h2>
        <p>Please read the following carefully before starting your exam:</p>
        <Button label="START" onClick={() => navigate(`/exam/start`)} />
      </div>
      </>
    )}
    </>
  )
}

export default EnterExam;