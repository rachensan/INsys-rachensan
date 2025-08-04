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
  const [selectedType, setSelectedType] = useState("identification");
  const [questionData, setQuestionData] = useState({});

  //reset data when type changes
  useEffect(() => {
    setQuestionData({});
  }, [selectedType]);

  const commonProps = {
    exam, //full exam info
    id: formId, //exam id
    onSave: (data) => {
      setQuestionData(data);
      onSave({ ...data, questionType: selectedType });
    },
    data: questionData,
  };


  return (
    <div className="question1Div">
      <h3>Add Question</h3>
      <SelectField
        label="Question Type"
        name="questionType"
        value={selectedType} 
        onChange={(e) => setSelectedType(e.target.value)}
        options={[
          { label: "Identification", value: "identification" },
          { label: "Multiple Choice", value: "multiplechoice" },
          { label: "True or False", value: "truefalse" },
          { label: "Essay", value: "Essay" }
        ]}
      />

      {selectedType === "identification" && <Identification {...commonProps} />}
      {selectedType === "multiplechoice" && <MultipleChoice {...commonProps} />}
      {selectedType === "truefalse" && <TrueFalse {...commonProps} />}
    </div>
  );
}

export default AllQuestions;

