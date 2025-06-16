import React, { useEffect, useState } from 'react'
import axios from 'axios';
import informations from '../../exam-info.js'


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


// EXPORT
function Exam() {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/exams")
      .then(res => setExamData(res.data))
      .catch(err => console.error("Failed to fetch exams", err))
  }, [])

  return (
    <>
      {examData.map(info => {
      return (
        <ExamPerContainer 
          key = {info.id}
          id = {info.id}
          title = {info.title} 
          schedule = {info.schedule}
        />);
      })}
    </>
  );
}

export default Exam;