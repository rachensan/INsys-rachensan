import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function ExamPerContainer({ title, id, schedule }) {
  return (
    <>
    <div className='exam'>
        <h1>{title} {id}</h1>
        <p>schedule: {schedule}</p>
    </div>
    </>
  )
}












function Exam() {
  const [examData, setExamData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/exams")
      .then(res => setExamData(res.data))
      .catch(err => console.log("Error fetching exams", err.message))
  }, [])


  return (
    <>
      <button onClick={() => navigate("/create-exam")}>
        Create New Exam
      </button>
      {examData.map(exam => {
      return (
        <ExamPerContainer 
          key = {exam.id}
          id = {exam.id}
          title = {exam.title} 
          schedule = {exam.schedule}
        />);
      })}
    </>
  );
}

export default Exam;