import React, { useState } from "react";

import Identification from "./3-Identification";
import MultipleChoice from "./3-MultipleC";
import TrueFalse from "./3-TrueFalse";

export const QuestionAdd = ({ onClick }) => {
  return (
    <div className="addQuesDiv" >
      <button className='question1-btn' onClick={onClick}>
      Add Question
    </button>
    </div>
  );
}

function AllQuestions({ exam, setExam, onSave, formId }) {
  console.log("ID:", formId);
  const [selectedType, setSelectedType] = useState("identification");

  return (
    <div className="question1Div">
      <h3>Add Question</h3>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="identification"> Identification </option>
        <option value="multiplechoice"> Multiple Choice </option>
        <option value="truefalse"> True or False </option>
      </select>
            
      {selectedType === "identification" && (<Identification exam={exam} id={exam?.id} onSave={(data)=> onSave({ ...data, questionType: "identification" })}/>)}

      {selectedType === "multiplechoice" && (<MultipleChoice exam={exam} id={exam?.id} onSave={(data)=> onSave({ ...data, questionType: "multiplechoice" })}/>)}

      {selectedType === "truefalse" && (<TrueFalse exam={exam} id={exam?.id} onSave={(data)=> onSave({ ...data, questionType: "truefalse"})}/>)}
        
    </div>
  ) //CLEAR THE DATA (layk yung sa inputs and yung saved questions/options) IN THIS SPECIFIC QUESTION WHENEVER THE USER CLICKS, CUZ IT COUNTS AS EDITING THE TYPE OF QUESTION
}


export default AllQuestions;

