import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Title from "./handleExam/1-Title";
import SelectedSection from './handleExam/2-Section';

import AllQuestions, { QuestionAdd } from './handleExam/3-AllQuesType';
import Identification from './handleExam/3-Identification';
import MultipleChoice from './handleExam/3-MultipleC';
import TrueFalse from './handleExam/3-TrueFalse';

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






  //useEffect will work IF there is an existing id
  useEffect(()=>{
    if(id) {
      axios.get(`http://localhost:3000/api/exams/${id}`)
        .then(res => {
          console.log(res.data);
          setExamData(res.data);
        })
        .catch(err=>{console.error(err)})
    }
  }, [id])  
  //it will be skipped, if no id seen, it will create a new one


  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) { //if existing: EDIT mode
      axios.put(`http://localhost:3000/api/exams/${id}`, examData)
        .then(res=>console.log('exam updated'))
        .catch(err=>console.error(err))
      
    } 
    else { //if NOT existing: CREATE-NEW mode
      axios.post('http://localhost:3000/api/exams', examData)
        .then(res=> {
          setExamData(res.data);
        })
        .catch(err=> console.log(err))
    }
  }

  console.log('yowooo', examData);


  return(
    <>
    <form onSubmit={handleSubmit}>
      <button type='submit'>Save Exam</button>

      <Title exam={examData} setExam={setExamData}/>

      <SelectedSection exam={examData} setExam={setExamData} />

      
{/*   Display existing questions   */}
      {examData.questions.map((q, i) => {
        if (q.questionType === 'identification') {
          return <Identification 
            key={i} 
            exam={examData} 
            id={q.id} 
            {...q}
            onSave={(updatedQ) => {
              setExamData(prev => {
                const updated = prev.questions.map(ques =>
                  ques.id === q.id ? { ...ques, ...updatedQ } : ques
                );
                return { ...prev, questions: updated };
              });
            }} />
        }
        if (q.questionType === 'multiplechoice') {
          return <MultipleChoice 
            key={i} 
            exam={examData} 
            id={q.id} 
            {...q} 
            onSave={(updatedQ) => {
              setExamData(prev => {
                const updated = prev.questions.map(ques =>
                  ques.id === q.id ? { ...ques, ...updatedQ } : ques
                );
                return { ...prev, questions: updated };
              });
            }} />
        }
        if (q.questionType === 'truefalse') {
          return <TrueFalse 
            key={i} 
            exam={examData} 
            id={q.id} 
            {...q}
            onSave={(updatedQ) => {
              setExamData(prev => {
                const updated = prev.questions.map(ques =>
                  ques.id === q.id ? { ...ques, ...updatedQ } : ques
                );
                return { ...prev, questions: updated };
              });
            }} />
        }
      })}


{/*   Adding of question FORM  */}
      {questionForms.map((e) => (
        <AllQuestions
          key={e.id}
          //formId pass to AllQuestions()
          formId={e.id} // pass unique ID (LOCAL, exists only on frontend, not tied to backend)
          exam={examData} // comes from backend or created via POST
          setExam={setExamData} 
          onSave={() => {
            axios.get(`http://localhost:3000/api/exams/${examData.id}`)
              .then(res => setExamData(res.data))
              .catch(err => console.error(err));
          }}
          // onSave={(newQuestion) => {
          //   setExamData(prev => {
          //     const currentQuestions = prev.questions || [];
          //     return {
          //       ...prev,
          //       questions: [...currentQuestions, newQuestion]
          //     };
          //   });
          // }}
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