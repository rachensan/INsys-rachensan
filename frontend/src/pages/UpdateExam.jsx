import axios from '../utils/axiosConfig.js';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

import SelectField from '../components/SelectFields.jsx';
import Button from '../components/Buttons.jsx';

//updateExam folder
import SelectedSection from '../components/updateExam/2-Section.jsx';
import AddQuestionForm, { QuestionAdd, EditableQuestionForm } from '../components/updateExam/3-AllQuesType.jsx';
import ScheduledTakers from '../components/updateExam/2-Schedule.jsx';


function UpdateExam() {
  const { accessToken } = useAuth();
  const { examId } = useParams();

  const [questionForms, setQuestionForms] = useState([]);
  const [selectedSectionName, setSelectedSectionName] = useState([]);

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

  const handleSaveExamInfo = async () => { //title, sections, wtvr
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };

    try {
      await axios.patch(`/exams/${examId}/details`, examInfo, config);
      console.log("Exam info updated");
    } catch (err) {
      console.error("Failed to update exam info:", err);
    }
  };

  const handlePublish = async () => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };

    try { 
      await axios.patch(`/exams/${examId}/status`, {status: 'published'}, config);
      console.log("Exam published!");
    } catch (err) {
      console.error("Failed to publish exam:", err);
    }
  };







  const handleSaveQuestion = async(data) => { //save via axios //data is from allquestype
    console.log("Posting question:", data);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };

    const questionId = Number.isInteger(data.questionId) ? data.questionId : null;

    try {
      console.log("print questionId:", data.questionId); //will only print if we edit the existing question. undefined if it's a new  question, because questionId is from frontend, and we dont axios GET the data when we create, backend will handle the id creation.

      if (questionId) {//camelCase cuz it's from AllQuesType.jsx
        //if EXISTING --- UPDATE existing question
        await axios.patch(`/exams/${examId}/questions/${questionId}`, { ...data, exam_id: examId }, config);
      } else {
        //if NOT EXISTING --- POST create another question
        await axios.post(`/questions/${examId}`, { ...data, exam_id: examId }, config);
      }

      //clear form
      setQuestionForms([]); 

      //refetch and update questions from DB.. best practice
      const updatedQuestions = await axios.get(`/exams/questions/${examId}`, config);
      setExamQues(updatedQuestions.data);
    } catch (err) {
      console.error("Failed to create question:", err);
    }
  };

  const handleDeleteQuestion = async(questionId) => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    };

    try {
      await axios.delete(`/exams/${examId}/questions/${questionId}`, config);
  
      const updatedQuestions = await axios.get(`/exams/questions/${examId}`, config);
      //refetch and update questions from DB.. best practice
      setExamQues(updatedQuestions.data);
      console.log('question deleted');
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  }

  return (
    <>
      <div>
        <div>
          <div>
            <label>Title: </label>
            <input className="title-input"
              type="text"
              name="title"
              value={examInfo.title}
              onChange={(e) => {
                setExamInfo({ ...examInfo, [e.target.name]: e.target.value });
              }}
              placeholder="...Exam Title"
            />
            <Button label="Save" onClick={handleSaveExamInfo} />
          </div>

          <p>Code: {examInfo.exam_code}</p>
          <p>Status: {examInfo.status}</p>
          <Button label="Publish" onClick={handlePublish} />
        </div>

        <p>Sections: </p>
        <div>
          <SelectedSection setSelectedSectionName={setSelectedSectionName}/>
        </div>

        <div>
          <ScheduledTakers selectedSectionName={selectedSectionName}/>
        </div>
      </div>
      

      {examQues.map((q) => (
        <EditableQuestionForm
          key={q.question_id}
          data={q}
          onSave={handleSaveQuestion}
          onDelete={handleDeleteQuestion}
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
      
      <QuestionAdd onClick={handleQuestionAdd} />
    </>
  );
}

export default UpdateExam;