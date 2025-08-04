import axios from '../utils/axiosConfig.js';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

import SelectField from '../components/SelectFields.jsx';

//updateExam folder
import Identification from './updateExam/3-Identification.jsx'
import MultipleChoice from './updateExam/3-MultipleC.jsx'
import TrueFalse from './updateExam/3-TrueFalse.jsx'

function UpdateExam() {
  const { accessToken } = useAuth();
  const { examId } = useParams();

  const [questionTypes, setQuestionTypes] = useState({});
  const [questionForms, setQuestionForms] = useState([]);

  const [examInfo, setExamInfo] = useState(null);
  const [examQues, setExamQues] = useState(null);

  useEffect(() => {
    if (!accessToken || !examId) return;

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` }
        const config = {
          headers,
          withCredentials: true
        };

        const examInfo = await axios.get(`/exams/exam/${examId}`, config);
        const examQuestions = await axios.get(`/exams/questions/${examId}`, config);

        setExamInfo(examInfo.data);
        setExamQues(examQuestions.data);
      } catch (err) {
        console.error("Error fetching exam data:", err);
      }
    };

    fetchData();
  }, [examId, accessToken]);

  if (!examInfo) return <p>Loading exam... fetching exam info...</p>;
  if (!examQues) return <p>Loading exam... probably no questions yet...</p>;

  const handleSave = async (updatedData) => {
    const headers = { Authorization: `Bearer ${accessToken}` }
    const config = {
      headers,
      withCredentials: true
    };

    try {
      const res = await axios.patch(`/api/questions/${updatedData.question_id}`, updatedData);
      
      console.log("Updated successfully:", res.data);
      // Optionally update local state if needed
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <> UpdateExam
    <div>
      <h2>Update Exam: {examInfo.title}</h2>
      <p>Code: {examInfo.exam_code}</p>
      <p>Schedule: {examInfo.schedule}</p>
      <p>Status: {examInfo.status}</p>
      <p>Sections: {examInfo.sections}</p>
    </div>

    {examQues.map((q) => {
  if (q.question_type === 'identification') {
    return (
      <div key={q.question_id}>
        <Identification 
          id={q.question_id}
          question={q.question_text}
          correctAnswer={q.correct_answer}
          points={q.points}
          onSave={handleSave}
        />
      </div>
    );
  }

  if (q.question_type === 'multiplechoice') {
    return (
      <div key={q.question_id}>
        <MultipleChoice 
          id={q.question_id}
          question={q.question_text}
          optionA={q.option_a}
          optionB={q.option_b}
          optionC={q.option_c}
          optionD={q.option_d}
          correctAnswer={q.correct_answer}
          points={q.points}
          onSave={handleSave}
        />
      </div>
    );
  }

  if (q.question_type === 'truefalse') {
    return (
      <div key={q.question_id}>
        <TrueFalse 
          id={q.question_id}
          question={q.question_text}
          optionA={q.option_a}
          optionB={q.option_b}
          correctAnswer={q.correct_answer}
          points={q.points}
          onSave={handleSave}
        />
      </div>
    );
  }

  {/*   Adding of question FORM  */}
  {questionForms.map((e) => (
    <AllQuestions
      key={e.id}
      formId={e.id}
      exam={examData} // comes from backend or created via POST
      setExam={setExamData} 
      onSave={() => {
        axios.get(`http://localhost:3000/api/exams/${examData.id}`)
          .then(res => setExamData(res.data))
          .catch(err => console.error(err));
      }}
    />
  ))}




  return null; // fallback
})}
    </>
  );
}

export default UpdateExam;