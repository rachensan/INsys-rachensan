import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//hooks
import { useExams } from '../hooks/useExams.js';
//components
import Button from '../components/Buttons.jsx';
import DraftExams from '../components/home/DraftExams.jsx';
import OngoingExams from '../components/home/OngoingExams.jsx';
import CompletedExams from '../components/home/CompletedExams.jsx';

function Home() {
  const navigate = useNavigate();
  const { exams, deleteExam, duplicateExam, fetchAllExams } = useExams();

  const [status, setStatus] = useState('draft');
  const [allExams, setAllExams] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllExams();
      setAllExams(data);
    };
    load();
  }, []);

  const filteredExams = allExams.filter(exam => exam.status === status);

  return (
    <>
      <button onClick={() => navigate('/create-exam')}>Create Exam</button>
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