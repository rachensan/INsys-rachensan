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
  const [examId, setExamId] = useState(null);

  const handleEnterCode = async () =>  {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };
    try {
      const res = await axios.post(`/student/verify`, {inputCode: inputExamCode, inputSection: inputExamSection}, config) //this post request still returns value, so we can use the data

      setIsVerified(true);
      
      //if verified, it will proceed to this
      setExamId(res.data.exam.exam_id);
      console.log("Try lang,,, Exam ID:", res.data.exam.exam_id);
    } catch (error) {
      alert(error.response?.data?.error || error.message || "Something went wrong");
    }
  }

  const handleStartClick = async () => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };
    try {
      const res = await axios.post(`/student/exams/${examId}/start`, {}, config); 
      console.log(res.status)
      navigate(`/exam/start/${examId}`);
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  }
  
  return (
    <>
    {!isVerified ? (
      <>
      <label>"Code: "</label>
      <InputField
        name="code"
        value={inputExamCode} 
        onChange={(e) => setInputExamCode(e.target.value)}
        placeholder="Enter exam code"
      />
      <label>"Section: "</label>
      <InputField 
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
        <Button label="START" onClick={handleStartClick} />
      </div>
      </>
    )}
    </>
  )
}

export default EnterExam;