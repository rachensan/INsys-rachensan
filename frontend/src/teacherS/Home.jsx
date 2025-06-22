import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export const HomeCard = ({ title, subjCode, schedule, status, sections, onClick }) => {
  return (
    <>
    <div onClick={onClick} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h2>{title}</h2>
      <p>{subjCode}</p>
      <p>{schedule}</p>
      <p>{sections}</p>
    </div>
    </>
  )
}

function Home() {
  const navigate = useNavigate();
  const [exam, setExam] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/exams') //just calling
      .then(res=> {
        setExam(res.data);
      })
      .catch (err => {
        console.error('Failed to fetch exam data: ', err);
      })
  }, []);

  return (
    <>
    <button onClick={()=>navigate('/create-exam')}>
      Create Exam
    </button>
    {exam.map((e) => {
      return (
        <HomeCard
          key={e.id}
          id={e.id}
          title={e.title}
          schedule={e.schedule}
          status={e.status}
          sections={e.sections}
          onClick={()=>navigate(`/handle-exam/${e.id}`)} //search for that exam id
        />
      )
    })}
    </>
  )
}

export default Home;