import axios from "../../utils/axiosConfig";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import RadioButtonOptions from "../RadioButtonOptions";


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


function ExamQuestions() {
  const { accessToken } = useAuth();

  const { examId } = useParams(); //not params.,, dapat galing sa code
  const [ examQuestions, setExamQuestions ] = useState([]);
  const [current, setCurrent] = useState(0);

  const [ selectedAnswer, setSelectedAnswer ] = useState('');

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

  const optionsArray = [
    examQuestions[current].option_a,
    examQuestions[current].option_b,
    examQuestions[current].option_c,
    examQuestions[current].option_d,
  ];
  
  return (
    <>
    <div>
      <h2>Question {current + 1}</h2> 
      {
      (() => {console.log(optionsArray)
        console.log(selectedAnswer)
        //(()=>{})() → we will call the function right away,,, das why we have () at the end
        switch (examQuestions[current].question_type) {
          case "multiplechoice":
            return (
              <MultiChoiceComp 
                mcqText={examQuestions[current].question_text}
                mcqOptions={optionsArray}
                name={`q${current}`} 
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
            )
          // case "identification":
          //   return <p>{examQuestions[current].question_text} (ID UI)</p>;
          // case "truefalse":
          //   return <p>{examQuestions[current].question_text} (TF UI)</p>;
        
          default: 
            return null;
        }


      })()
        

      }
      

      <div>
        <br/><br/><br/>
        <button
          disabled={current === 0}
          onClick={() => setCurrent((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={current === examQuestions.length - 1}
          onClick={() => setCurrent((prev) => prev + 1)}
        >
          Next
        </button>
      </div>




    </div>
    </>
  )
}

export default ExamQuestions;