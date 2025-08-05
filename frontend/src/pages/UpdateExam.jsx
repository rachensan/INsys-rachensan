import axios from '../utils/axiosConfig.js';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

import SelectField from '../components/SelectFields.jsx';

//updateExam folder
import AddQuestionForm, { QuestionAdd, EditableQuestionForm } from './updateExam/3-AllQuesType.jsx';

function UpdateExam() {
  const { accessToken } = useAuth();
  const { examId } = useParams();

  const [questionTypes, setQuestionTypes] = useState({});
  const [questionForms, setQuestionForms] = useState([]);

  const [examInfo, setExamInfo] = useState(null); //title, code, stats, sched, sect
  const [examQues, setExamQues] = useState(null); //questions

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

  const handleQuestionAdd = async() => { //adds blank form just for displaying empty form UI 
    const newForm = { id: Date.now() };
    setQuestionForms((prev) => [...prev, newForm]);
  }

  const handleSaveQuestion = async (data) => { //save via axios
    try {
      const headers = { Authorization: `Bearer ${accessToken}` }
      const config = {
        headers,
        withCredentials: true
      };
    
      const res = await axios.post(`/questions/${examId}`, {
        ...data,
        exam_id: examId
      }, config);

      console.log("✅ Created new question:", res.data);

      // Optionally refetch all questions
      const updatedQuestions = await axios.get(`/exams/questions/${examId}`, config);
      setExamQues(updatedQuestions.data);
    } catch (err) {
      console.error("❌ Failed to create question:", err);
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

    <QuestionAdd onClick={handleQuestionAdd} />

    {examQues.map((q) => (
      <EditableQuestionForm
        key={q.question_id}
        data={q}
        onSave={handleSaveQuestion}
      />
    ))}


  {/*   Adding of question FORM  */}

  {questionForms.map((form) => (
    <AddQuestionForm
      key={form.id}
      formId={form.id}
      exam={examQues}
      setExam={setExamQues}
      onSave={handleSaveQuestion}
    />
  )
  )}
    </>
  );
}

export default UpdateExam;