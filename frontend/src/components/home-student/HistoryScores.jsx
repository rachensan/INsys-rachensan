import axios from "../../utils/axiosConfig";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ScoreDetails = () => {
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  

  const [history, setHistory] = useState();
  
  useEffect(() => {
    const fetchHistory = async() => {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      };
      try {
        const res = await axios.get('/students/exam-history', config);
        setHistory(res.data);
        console.log(res.data || "history");
      } catch (error) {
        console.error("Error fetching score history: ", error);
      }
    }
    fetchHistory();
  }, []);
  return (
    <>
    <div className="history-grids">
      <div className="student-home-scores">
        <p>galing sayo laman neto no?</p>
      </div>
    </div>
    </>
  )
}

function ScoreHistory() {
  return (
    <>
    {/* <!-- start history container --> */}
    <div className="student-home-history">
      <div className="student-home-history-label">History <i className="fa-solid fa-clock-rotate-left"></i></div>
      <div className="student-home-grid">
        <div className="history-grids-label">
          <span className="history-label">Subject</span>
          <span className="history-label">Type</span>
          <span className="history-label">Date</span>
          <span className="history-label">Score</span>
        </div>

        <ScoreDetails />
        
      </div>

    </div>
    {/* <!-- end history container --> */}
    </>
  )
}

export default ScoreHistory;