import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../utils/axiosConfig.js";


export const HomeCard = ({ title, subjCode, schedule, status, sections, onClickNav, onClickDel }) => {

  return (
    <>
    <div onClick={onClickNav} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <button onClick={(e)=>{
        e.stopPropagation(); //stop triggering the onClickNav
        onClickDel();
      }}>Delete</button>
      <h2>{title}</h2>
      <p>{subjCode}</p>
      <p>{schedule}</p>
      <p>{sections}</p>
      <p>{status}</p>
    </div>
    </>
  )
}

function Home() {
  const navigate = useNavigate();
  const [exam, setExam] = useState([]);

  useEffect(() => {
  axios.get('/protected', { withCredentials: true })
    .then(res => {
      console.log(res.data); // will show { message: "JWT is valid", user: ... }
    })
    .catch(err => {
      console.error("Not authenticated:", err.response?.status);
    });
}, []);

  useEffect(() => {
    axios.get('/exams', { withCredentials: true }) 
      .then(res=> {
        setExam(res.data);
      })
      .catch (err => {
        console.error('Failed to fetch exam data: ', err);
      })
  }, []);

    const handleDelete = (id) => {
      axios.delete(`http://localhost:3000/api/exams/${id}`)
        .then(() => {
            setExam(prev => prev.filter(e => e.id !== id)); // update UI
        })
        .catch(err=>console.error(err))
    } 

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
          onClickDel={()=>handleDelete(e.id)}
          onClickNav={()=>navigate(`/handle-exam/${e.id}`)} //search for that exam id
        />
      )
    })}
    </>
  )
}

export default Home;