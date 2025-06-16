import React, { useState } from "react";

import QuesIdentification from "./C1-QuesIdentification";
import QuesMultiChoice from "./C2-QuesMultiChoice";
import QuesTrueFalse from "./C3-QuesTrueFalse";

function QuestionAdd({ onClick }) {
  return (
    <button className='editTitleBTN' onClick={onClick}>
      Add Question
    </button>
  );
}

function QuestionDiv(props) {
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
                
                {selectedType === "identification" && (<QuesIdentification id={props.id} onSave={(data)=> props.onSave({ ...data, questionType: "identification" })}/>)}
                {selectedType === "multiplechoice" && (<QuesMultiChoice id={props.id} onSave={(data)=> props.onSave({ ...data, questionType: "multiplechoice" })}/>)}
                {selectedType === "truefalse" && (<QuesTrueFalse id={props.id} onSave={(data)=> props.onSave({ ...data, questionType: "truefalse"})}/>)}
        </div>
    ) //CLEAR THE DATA (layk yung sa inputs and yung saved questions/options) IN THIS SPECIFIC QUESTION WHENEVER THE USER CLICKS, CUZ IT COUNTS AS EDITING THE TYPE OF QUESTION
}


export default QuestionDiv;
export {QuestionAdd}; //no need to export if sa loob to ng QuestionDiv 

