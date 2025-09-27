import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axiosConfig.js';

//context
import { useAuth } from '../context/AuthContext.jsx';
//hooks
import { useExams } from '../hooks/useExams.js';

//components
import Button from '../components/Buttons.jsx';
import LogoutButton from '../components/Logout.jsx'
import SelectField from '../components/SelectFields.jsx';
import DraftExams from '../components/home-teacher/DraftExams.jsx';
import OngoingExams from '../components/home-teacher/OngoingExams.jsx';
import CompletedExams from '../components/home-teacher/CompletedExams.jsx';

function HomeTeacher() {
  const navigate = useNavigate();
  const { user } = useAuth();

  //========= home filter status =========//
  const { exams, deleteExam, duplicateExam, fetchAllExams } = useExams();

  const [status, setStatus] = useState('draft');
  const [allExams, setAllExams] = useState([]);

  //========= create exam modal =========//
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    try {
      const res = await axios.post('/exams/create-exam', {
        title,
        schedule: null,
        status: "draft"
      });
      navigate(`/update-exam/${res.data.exam_id}`)
    } catch (err) {
      console.error("Error creating exam", err);
    }
  };
  
  useEffect(() => {
    const load = async () => {
      const data = await fetchAllExams;
      setAllExams(data);
    };
    load();
  }, []);

  const optionsArray = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Ongoing" },
    { value: "completed", label: "Completed" }
  ];

  return (
    <>
    <div>


    
  {/* <!-- sidebar -->
      <!-- start-->   */}
      <div className="sidebar">
        <div className="sidebar-image">
          <img src="logo.png" alt="Sidebar Image"/>
        </div>

        <div className="sidebar-buttons">
          <h1 className="sidebar-title">Tools</h1>
          <button className="sidebar-btn" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i>Create Exam</button>
            {showModal && (
              <div className="modal">
                <input
                  type="text"
                  placeholder="Enter exam title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={handleCreate}>Confirm</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            )}
          <button className="sidebar-btn"><i className="fas fa-chart-bar"></i> Exam Analytics</button>
          <LogoutButton className="sidebar-btn"/>
        </div>

        <div className="profile-container">
          <i className="fa-solid fa-user"></i>
          <div className="profile-info">
              <div className="profile-name">{user.nameFNfirst}</div>
              <div className="profile-title">Instructor</div>
          </div>
        </div>
        
      </div>
      {/* <!-- end sidebar --> */}

      

{/* <!-- main home content -->
    <!-- start --> */}
    <div className="main-home-content">
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Search" />
        <SelectField className="dropdown"
          label="Status" 
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={optionsArray}
        />
      </div>
      <h1 className="sidebar-title">Exams</h1>

  {/* <!--  grid container -->
      <!-- start grid container --> */}
      <div className="grid-container">

    {/* <!-- grid item-->
        <!--start--> */}
        <div>
            {status === 'draft' && 
            <DraftExams 
              className="grid-item"
              exams={exams.filter(e => e.status === 'draft')} 
              onClickDel={deleteExam} 
              onClickDupe={duplicateExam}
            />}
            {status === 'published' && 
            <OngoingExams 
              className="grid-item"
              exams={exams.filter(e => e.status === 'published')} 
              onClickDel={deleteExam} 
              onClickDupe={duplicateExam} />}
            {status === 'completed' && 
            <CompletedExams 
              className="grid-item"
              exams={exams.filter(e => e.status === 'completed')} 
              onClickDel={deleteExam} 
              onClickDupe={duplicateExam} 
            />}
        </div>

        
      </div>
      
    </div>

      
    </div>
    </>
  );
}

export default HomeTeacher;