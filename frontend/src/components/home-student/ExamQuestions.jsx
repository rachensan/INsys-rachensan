import axios from "../../utils/axiosConfig";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import RadioButtonOptions from "../RadioButtonOptions";
import InputField from "../InputFields"
import SelectField from "../SelectFields";
import Buttons from "../Buttons"


const MultiChoiceComp = ({mcqText, mcqOptions, name, divClassName, onChange, value}) => {
  return (
    <>
      <div>
        <div style={{ backgroundColor: 'lightgray' }}>
          <p>{mcqText}</p>
        </div>
        <div style={{ backgroundColor: 'darkgreen' }}>
          <RadioButtonOptions
            name={name}
            value={value}
            onChange={onChange}
            options={mcqOptions}
            divClassName={divClassName}
          />
        </div>
      </div>
    </>
  )
}

const IdentificationComp = ({idenText, name, divClassName, placeholder, onChange, value}) => {
  return (
    <>
      <div>
        <div style={{ backgroundColor: 'lightgray' }}>
          <p>{idenText}</p>
        </div>
        <div style={{ backgroundColor: 'skyblue' }}>
          <InputField 
            name={name}
            value={value || ""} //must be string or number
            onChange={onChange}
            placeholder={placeholder}
            divClassName={divClassName}
          />
        </div>
      </div>
    </>
  )
}

const EssayComp = ({essayText, name, divClassName, placeholder, onChange, value}) => {
  return (
    <>
      <div>
        <div style={{ backgroundColor: 'lightgray' }}>
          <p>{essayText}</p>
        </div>
        <div style={{ backgroundColor: 'lightgreen' }}>
          <InputField 
            name={name}
            value={value || ""} //must be string or number
            onChange={onChange}
            placeholder={placeholder}
            divClassName={divClassName}
          />
        </div>
      </div>
    </>
  )
}

const TrueFalseComp = ({tfText, tfOptions, name, divClassName, onChange, value}) => {
  return (
    <>
      <div>
        <div style={{ backgroundColor: 'lightgray' }}>
          <p>{tfText}</p>
        </div>
        <div style={{ backgroundColor: 'pink' }}>
          <RadioButtonOptions
            name={name}
            value={value}
            onChange={onChange}
            options={tfOptions}
            divClassName={divClassName}
          />
        </div>
      </div>
    </>
  )
}


function ExamQuestions() {
  const { accessToken } = useAuth();

  const { examId } = useParams(); //not params.,, dapat galing sa code
  const [ examQuestions, setExamQuestions ] = useState([]);
  const [current, setCurrent] = useState(0);

  const [ selectedAnswer, setSelectedAnswer ] = useState('');
  const [ inputExamCode, setInputExamCode ] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      }; 
      try {
        const res = await axios.get(`/exams/questions/${examId}`, config);
        setExamQuestions(res.data); //assuming backend sends array
      } catch (error) {
        alert(error.response?.data?.error || "Something went wrong");
      }
    } 
    fetchQuestions();
  }, [examId]);

  if (!examQuestions.length) return <p>Loading questions...</p>;

  const optionsArrayMCQ = [
    examQuestions[current].option_a,
    examQuestions[current].option_b,
    examQuestions[current].option_c,
    examQuestions[current].option_d,
  ];

  const optionsArrayTF = [
    examQuestions[current].option_a,
    examQuestions[current].option_b
  ];

  const handleStudentAnswer = async() => { //adds blank form just for displaying empty form UI 
    const currentQuestion = examQuestions[current];

    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      };

//  questionId, studentSchoolId, studentAnswer, examId  //
      await axios.post(`/student-answers/submit`, {
        examId,
        questionId: currentQuestion.question_id,
        studentAnswer: selectedAnswer
      }, config);

      console.log("student answer saved to DB... save student_answers table");
      //clear answer for next question
      setSelectedAnswer('');

      //go to next question
      if (current < examQuestions.length - 1) {
        setCurrent((prev) => prev + 1);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to save answer");
    }
  }

  return (
    <>
    <div>
      <h2>Question {current + 1}</h2> 
      {
      (() => {
        //console.log(optionsArray)
        //console.log(selectedAnswer)
        //(()=>{})() → we will call the function right away,,, das why we have () at the end
        switch (examQuestions[current].question_type) { //question-type here
          case "multiplechoice":
            return (
              <MultiChoiceComp 
                mcqText={examQuestions[current].question_text}
                mcqOptions={optionsArrayMCQ}
                name={`q${current}`} 
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
            )
          case "identification":
            return (
              <IdentificationComp
                idenText={examQuestions[current].question_text}
                name={`q${current}`} 
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="... "
                divClassName="antok-ka-na-ba"
              />
            )

          case "essay":
            return (
              <EssayComp
                essayText={examQuestions[current].question_text}
                name={`q${current}`} 
                value={'edit this answer container, bruh'}//save to db and clear the last selectedAnswer
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="... "
                divClassName="antok-ka-na-ba"
              />
            )
          case "truefalse":
            return (
              <TrueFalseComp 
                tfText={examQuestions[current].question_text}
                tfOptions={optionsArrayTF}
                name={`q${current}`} 
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
            )

          default: 
            return null;
        }


      })()
        

      }
      

      <div>
        <p>  {examQuestions[current].question_text} </p>
        <br/><br/><br/>

        {/* <button
          disabled={current === 0}
          onClick={() => setCurrent((prev) => prev - 1)}
        >
          Previous
        </button> */}

        <Buttons 
          label={current === examQuestions.length - 1? "Submit Exam" : "NEXT question bij"}
          onClick={handleStudentAnswer}  //() => setCurrent((prev) => prev + 1)
        />
          
      </div>




    </div>
    </>
  )
}

export default ExamQuestions;