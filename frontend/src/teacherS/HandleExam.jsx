import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Title from "./handleExam/1-Title";
import SelectedSection from './handleExam/2-Section';
import AllQuestions from './handleExam/3-AllQuesType';
import { QuestionAdd } from './handleExam/3-AllQuesType';

function HandleExam() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [questionForms, setQuestionForms] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(1); //id increment per question

  //THESE: exam, setExam ARE THE ENTIRE EXAM OBJECT
  const [examData, setExamData] = useState({
    title: '',
    schedule: '',
    status: 'pending',
    sections: [],
    questions: [],
  })
  
  const defaultExamNotChanging = {
    title: '',
    schedule: '',
    status: 'pending',
    sections: [],
    questions: [],
  } //for resetting the form, etc.

  const [selectedSections, setSelectedSections] = useState([]);

  //useEffect will work IF there is an existing id
  useEffect(()=>{
    if(id) {
      axios.get(`http://localhost:3000/api/exams/${id}`)
        .then(res => {setExamData(res.data)})
        .catch(err=>{console.error(err)})
    }
  }, [id])  
  //it will be skipped, if no id seen, it will create a new one

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data being sent:", {
      ...examData,
      sections: selectedSections
    });


    if (id) { //if existing: EDIT mode
      axios.put(`http://localhost:3000/api/exams/${id}`, examData)
        .then(res=>console.log('exam updated'))
        .catch(err=>console.error(err))
    } 
    else { //if NOT existing: CREATE-NEW mode
      const newExam = { ...examData, sections: selectedSections}
      axios.post('http://localhost:3000/api/exams', newExam)
        .then(res=> {
          setExamData({ ...defaultExamNotChanging}); //auto reset form for future creations
          setSelectedSections([]); // clear the checkboxes
          navigate('/');
        })
        .catch(err=> console.log(err))
    }
  }


  return(
    <>
    <form onSubmit={handleSubmit}>
      <button type='submit'>Save Exam</button>

      <Title exam={examData} setExam={setExamData}/>

      <SelectedSection exam={examData} setExam={setExamData} />

      {questionForms.map((form) => (
        <AllQuestions
          key={form.id}
          formId={form.id} // pass unique ID
          exam={examData}
          setExam={setExamData} 
          onSave={(newQuestion) => {
            setExamData(prev => {
              const currentQuestions = prev.questions || [];
              return {
                ...prev,
                questions: [...currentQuestions, newQuestion]
              };
            });
          }}


        />
      ))}


    
      <QuestionAdd onClick={() => {
        setQuestionForms(prev => [...prev, {id: questionCounter}]);
        setQuestionCounter(prev => prev + 1); //ID per click add question
      }} />

    </form>
      
    </>
  )
}

export default HandleExam;