import axios from "../../utils/axiosConfig";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import RadioButtonOptions from "../RadioButtonOptions";
import InputField from "../InputFields"
import SelectField from "../SelectFields";
import Button from "../Buttons"
import { FinishExamInfo } from "./FinishExamInfo";


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
  const navigate = useNavigate();

  const { examId } = useParams(); //not params.,, dapat galing sa code
  const [ examQuestions, setExamQuestions ] = useState([]);
  const [current, setCurrent] = useState(0);

  const [ selectedAnswer, setSelectedAnswer ] = useState('');
  const [examInfo, setExamInfo] = useState(null);
  const [submitted, setSubmitted] = useState(false);

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
        alert(error.response?.data?.error || "Something went wrong in fetchingQuestions");
      }
    } 
    fetchQuestions();
  }, [examId]);


  const fetchExamInfo = async() => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    }; 
    try {
      const res = await axios.get(`/student/exams/${examId}/info`, config);
      setExamInfo(res.data);
    } catch (error) {
      console.log(
        error.response?.data?.error ||
        error.response?.data ||
        error.message
      );
      alert(error.response?.data?.error || "Something went wrong in getting fetchExamInfo");
    }
  }


  if (!examQuestions.length) return <p>Loading questions...</p>;

  //nasa render logic to: return(...)
  // const optionsArrayMCQ = [
  //   examQuestions[current].option_a,
  //   examQuestions[current].option_b,
  //   examQuestions[current].option_c,
  //   examQuestions[current].option_d,
  // ];

  // const optionsArrayTF = [
  //   examQuestions[current].option_a,
  //   examQuestions[current].option_b
  // ];

  const handleStudentAnswer = async() => { //adds blank form just for displaying empty form UI 
    const currentQuestion = examQuestions[current];

    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      };

//  questionId (nasa backend na), studentSchoolId, studentAnswer, examId  //
      await axios.post(`/student-answers/${examId}/submit`, {
        examId,
        questionId: currentQuestion.question_id,
        studentAnswer: selectedAnswer
      }, config);

      console.log("student answer saved to DB... save student_answers table");
      //clear answer for next question
      setSelectedAnswer('');
    } catch (error) {
      alert(error.response?.data?.error || "Failed to save answer");
    }
  }

  const q = examQuestions.length > 0 ? examQuestions[current] : null;  //will use in return(...) for shortcut
return (
    <>
    {submitted ? (
      <div>
        <FinishExamInfo 
          examTitle={examInfo.title}
          examAutomatedScore={examInfo.total_score}
        />
      </div>
    ): ( 
            //if no question remains (anu hah):(navigate to exam score/details page)
      <div>
        <h2>Question {current + 1}</h2> 
        {!submitted && q && (
          <>
            {/* console.log(optionsArray) */}
            {/* console.log(selectedAnswer) */}
          
            {(() => {
              const optionsArrayMCQ = [
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d,
              ];

              const optionsArrayTF = [
                q.option_a,
                q.option_b,
              ];

              switch (q.question_type) { //question-type here
                case "multiplechoice":
                  return (
                    <MultiChoiceComp 
                      mcqText={q.question_text}
                      mcqOptions={optionsArrayMCQ}
                      name={`q${current}`} 
                      value={selectedAnswer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                  )
                case "identification":
                  return (
                    <IdentificationComp
                      idenText={q.question_text}
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
                      essayText={q.question_text}
                      name={`q${current}`} 
                      value={'edit this answer container, bruh'} //save to db and clear the last selectedAnswer
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      placeholder="... "
                      divClassName="antok-ka-na-ba"
                    />
                  )
                case "truefalse":
                  return (
                    <TrueFalseComp 
                      tfText={q.question_text}
                      tfOptions={optionsArrayTF}
                      name={`q${current}`} 
                      value={selectedAnswer}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                  )
                default: 
                  return null;
              }
            })()}
          </>
        )}
        <div>
          {/*q might be null if examQuestions empty*/}
          <p>{q ? q.question_text : ""}</p> 
          <br/><br/><br/>
                  {/* <button
                    disabled={current === 0}
                    onClick={() => setCurrent((prev) => prev - 1)}
                  >
                    Previous
                  </button> */}
          <Button 
            label={current === examQuestions.length - 1 ? "Submit Exam" : "NEXT question bij"}
            onClick={async() => {
              await handleStudentAnswer();

              if (current === examQuestions.length - 1) { 
                //(array minus 1) is the last object
                //fetch exam info -> triggers showing FinishExamInfo
                await fetchExamInfo();
                setSubmitted(true);
              } else {
                setCurrent(prev => prev + 1); //push state past last question
              }
            }}  
          />
        </div>
      </div>
    )}
    
    </>
  )
}

export default ExamQuestions;