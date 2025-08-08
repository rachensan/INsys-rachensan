import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx';
import axios from "../utils/axiosConfig.js";


export const HomeCard = ({ data, title, subjCode, schedule, status, sections, onClickNav, onClickDel }) => {

  return (
    <div onClick={onClickNav} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <button className="delete-exam-btn" 
        onClick={(e) => { 
          e.stopPropagation(); 
          onClickDel(data.exam_id); }}>
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
  const examId = useParams();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${accessToken}` }
    const config = {
      headers,
      withCredentials: true
    };



    console.log("User:", user);
    console.log("Access Token:", accessToken);
    if (!user.userId || !accessToken) return;
    
      axios.get('/protected', config)
        .then(() => { return axios.get(`/exams/${user.userId}`, config) })
        .then((res) => { setExam(res.data) })
        .catch((err) => { console.error("Error fetching exams:", err.response?.status) });
  }, [accessToken, user.userId]);

  const handleDeleteExam = async(examId) => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };

    try {
      await axios.delete(`/exams/${examId}`, config);
  
      const updatedExams = await axios.get(`/exams/${user.userId}`, config);
      //refetch and update exams from DB.. 
      setExam(updatedExams.data);
      console.log('exam deleted');
    } catch (error) {
      console.error("Failed to delete exam:", error);
    }
  }

  return (
    <>
      <button onClick={() => navigate('/create-exam')}>Create Exam</button>
      {exam.map((e) => (
        <HomeCard //these from the database so use snake_case
          key={e.exam_id}
          title={e.title}
          subjCode={e.subj_code}
          schedule={e.schedule}
          status={e.status}
          sections={e.sections}
          data={e}
          onClickDel={handleDeleteExam} //send to: const handleDeleteExam = (examId)=>{}
          onClickNav={() => navigate(`/update-exam/${e.exam_id}`)}
        />
      ))}
    </>
  );
}

export default Home;