import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx';
import axios from "../utils/axiosConfig.js";


export const HomeCard = ({ title, subjCode, schedule, status, sections, onClickNav, onClickDel }) => {
  return (
    <div onClick={onClickNav} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClickDel();
        }}
      >
        Delete
      </button>
      <h2>{title}</h2>
      <p>{subjCode}</p>
      <p>{schedule}</p>
      <p>{sections}</p>
      <p>{status}</p>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const [exam, setExam] = useState([]);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    console.log("User:", user);
    console.log("Access Token:", accessToken);
    if (!user.userId || !accessToken) return;
    
      axios.get('/protected', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      })
      .then(() => {
        return axios.get(`/exams/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        });
      })
      .then((res) => {
        setExam(res.data);
      })
      .catch((err) => {
        console.error("Error fetching exams:", err.response?.status);
      });
    }, [accessToken, user.userId]);

  const handleDelete = (id) => {
    axios
      .delete(`/exams/${id}`)
      .then(() => {
        setExam((prev) => prev.filter((e) => e.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button onClick={() => navigate('/create-exam')}>Create Exam</button>
      {exam.map((e) => (
        <HomeCard
          key={e.id}
          title={e.title}
          subjCode={e.subj_code}
          schedule={e.schedule}
          status={e.status}
          sections={e.sections}
          onClickDel={() => handleDelete(e.id)}
          onClickNav={() => navigate(`/handle-exam/${e.id}`)}
        />
      ))}
    </>
  );
}

export default Home;