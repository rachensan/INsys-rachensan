import axios from "../../utils/axiosConfig";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function ExamQuestions() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const { examId } = useParams();
  const [ examQuestions, setExamQuestions ] = useState([]);
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const fetchQuestions = async () => {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      }; 
      try {
        const res = await axios.get(`/exams/questions/${examId}`, config);
        setExamQuestions(res.data); //assuming backend sends array
      } catch (error) {
        alert(error.response?.data?.error || "Something went wrong");
      }
    } 
    fetchQuestions();
  }, [examId]);

  if (!examQuestions.length) return <p>Loading questions...</p>;
  
  return (
    <>
    <div>
      <h2>Question {current + 1}</h2>
      <p>{examQuestions[current].question_text}</p>

      <div>
        <button
          disabled={current === 0}
          onClick={() => setCurrent((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={current === examQuestions.length - 1}
          onClick={() => setCurrent((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </>
  )
}

export default ExamQuestions;