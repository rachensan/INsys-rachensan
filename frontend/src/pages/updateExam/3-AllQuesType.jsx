import React, { useState, useEffect } from "react";

import Identification from "./3-Identification";
import MultipleChoice from "./3-MultipleC";
import TrueFalse from "./3-TrueFalse";
import SelectField from "../../components/SelectFields";

const questionTypes = [
  { label: "Identification", value: "identification" },
  { label: "Multiple Choice", value: "multiplechoice" },
  { label: "True or False", value: "truefalse" },
];

export const EditableQuestion = ({ data, onSave }) => { //editing existing questions in the database
  const [type, setType] = useState(data.question_type);
  const [formData, setFormData] = useState(data);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    if (newType !== type) {
      if (confirm("⚠️ Changing question type will reset current fields. Proceed?")) {
        setType(newType);
        setFormData({
          question_id: data.question_id,
          question_type: newType,
          question_text: '',
          correct_answer: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          points: 1
        });
      }
    }
  };

  const commonProps = {
    id: formData.question_id,
    question: formData.question_text,
    correctAnswer: formData.correct_answer,
    points: formData.points,
    optionA: formData.option_a,
    optionB: formData.option_b,
    optionC: formData.option_c,
    optionD: formData.option_d,
    onSave: onSave
  };

  return (
    <div className="editable-question">
      <SelectField
        label="Question Type"
        name="questionType"
        value={type}
        onChange={handleTypeChange}
        options={questionTypes}
      />

      {type === 'identification' && <Identification {...commonProps} />}
      {type === 'multiplechoice' && <MultipleChoice {...commonProps} />}
      {type === 'truefalse' && <TrueFalse {...commonProps} />}
    </div>
  );
}










export const QuestionAdd = ({ onClick }) => {
  return (
    <div className="addQuesDiv" >
      <button className='question1-btn' onClick={onClick}>
        Add Question
      </button>
    </div>
  );
}

function AllQuestions({ exam, setExam, onSave, formId }) { //adding new questions 
  const [selectedType, setSelectedType] = useState("identification");
  const [prevType, setPrevType] = useState("identification");
  const [questionData, setQuestionData] = useState({});

  //reset data when type changes
  useEffect(() => {
    setQuestionData({});
  }, [selectedType]);

  const handleQuesTypeChange = (e) => {
    const newType = e.target.value;

    if (newType !== selectedType) {
      const confirmed = window.confirm(
        "Changing question type will clear the current form. Continue?"
      );

      if (confirmed) {
        setSelectedType(newType);
        setPrevType(newType);
        setQuestionData({});
      } else {
        setSelectedType(prevType);
      }
    }
  };

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
        onChange={handleQuesTypeChange}
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

