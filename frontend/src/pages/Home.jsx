import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axiosConfig.js';

//hooks
import { useExams } from '../hooks/useExams.js';
//components
import Button from '../components/Buttons.jsx';
import DraftExams from '../components/home/DraftExams.jsx';
import OngoingExams from '../components/home/OngoingExams.jsx';
import CompletedExams from '../components/home/CompletedExams.jsx';

function Home() {
  const navigate = useNavigate();

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
      const data = await fetchAllExams();
      setAllExams(data);
    };
    load();
  }, []);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Exam</button>
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
      


      <Button label="Drafts" onClick={() => setStatus("draft")} />
      <Button label="Ongoing" onClick={() => setStatus('ongoing')} />
      <Button label="Completed" onClick={() => setStatus('completed')} />
      
      {status === 'draft' && 
      <DraftExams 
        exams={exams.filter(e => e.status === 'draft')} 
        onClickDel={deleteExam} 
        onClickDupe={duplicateExam}
      />}
      {status === 'ongoing' && 
      <OngoingExams 
        exams={exams.filter(e => e.status === 'ongoing')} 
        onClickDel={deleteExam} 
        onClickDupe={duplicateExam} />}
      {status === 'completed' && 
      <CompletedExams 
        exams={exams.filter(e => e.status === 'completed')} 
        onClickDel={deleteExam} 
        onClickDupe={duplicateExam} 
      />}
    </>
  );
}

export default Home;