import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx';
import axios from '../utils/axiosConfig.js';

//hooks
import { useExams } from '../hooks/useExams.js';
//components
import EnterExam from '../components/home-student/EnterExam.jsx';

function HomeStudent() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [checkSession, setCheckSession] = useState(null);
  const [sessionExamId, setSessionExamId] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      }; 

      try {
        const res = await axios.get('/student/session', config); //status, exam_id, current_index
        
        if(res.data) {
          setSessionExamId(res.data.exam_id);
          setCheckSession(res.data);
          setShowPopup(true);
          console.log(`there is an exam ongoing at exam_id: ${res.data.exam_id}`); //should be ${sessionExamId}, but console.log works first before it updates the useState
        }
      } catch (error) {
        console.log('wala nahanap');
      }
    }

    fetchSession();
  }, []);

  // navigate to exam page
  const handleEnterExam = () => {
    console.log("Entering exam", sessionExamId);
    setShowPopup(false);
    navigate(`/exam/start/${sessionExamId}`);
  };

  //submitAll
  const handleSubmitExam = () => {
    console.log("Submit exam", sessionExamId);
    setShowPopup(false);
  };

  return (
    <>
      <EnterExam />
      {showPopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}>
            <h2>⚠️ Ongoing Exam</h2>
            <p>You already have an exam in progress. Continue or submit?</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
              <button onClick={handleEnterExam}>Enter Exam</button>
              <button onClick={handleSubmitExam}>Submit Exam</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeStudent;