import React, { useState, useEffect } from "react";

import Identification from "./3-Identification";
import MultipleChoice from "./3-MultipleC";
import TrueFalse from "./3-TrueFalse";
import Essay from "./3-Essay";
import SelectField from "../../components/SelectFields";

const questionTypes = [
  { label: "Identification", value: "identification" },
  { label: "Multiple Choice", value: "multiplechoice" },
  { label: "True or False", value: "truefalse" },
  { label: "Essay", value: "essay" }
];

export const EditableQuestionForm = ({ data, onSave }) => { //editing existing questions in the database
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

  const commonProps = { //from DB so snake_case
    id: formData.question_id,
    question: formData.question_text,
    questionType: formData.question_type,
    correctAnswer: formData.correct_answer,
    points: formData.points,
    onSave: onSave
  };

  const optionsArray = [
    formData.option_a,
    formData.option_b,
    formData.option_c,
    formData.option_d,
  ];

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
      {type === 'multiplechoice' && <MultipleChoice {...commonProps} options={optionsArray} />}
      {type === 'truefalse' && <TrueFalse {...commonProps} />}
      {type === 'essay' && <Essay {...commonProps} />}
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



function AddQuestionForm({ exam, onSave, formId }) { //adding new questions 
  const [selectedType, setSelectedType] = useState("identification");
  const [prevType, setPrevType] = useState("identification");
  const [questionData, setQuestionData] = useState({});

  //reset data when type changes
  useEffect(() => {
    setQuestionData({});
  }, [selectedType]);

  const handleQuesTypeChange = (e) => {
    const newType = e.target.value;

    const hasInput = Object.keys(questionData).length > 0; //{"question_text", "options", "etc"} or {}

    if (newType !== selectedType && hasInput) {
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
    } else {
      setSelectedType(newType);
      setPrevType(newType);
      setQuestionData({});
    }
  };

  const commonProps = {
    exam, //full exam info
    id: formId, //exam id
    onSave: (data) => {
      const dataAndType = { ...data, questionType: selectedType };
      setQuestionData(dataAndType);
      onSave(dataAndType); //call parent AXIOS POST
    },
    data: questionData,
  };


  return (
    <div className="question1Div">
      <SelectField
        label="Question Type"
        name="questionType"
        value={selectedType}
        onChange={handleQuesTypeChange}
        options={[
          { label: "Identification", value: "identification" },
          { label: "Multiple Choice", value: "multiplechoice" },
          { label: "True or False", value: "truefalse" },
          { label: "Essay", value: "essay" }
        ]}
      />

      {selectedType === "identification" && <Identification {...commonProps} />}
      {selectedType === "multiplechoice" && <MultipleChoice {...commonProps} />}
      {selectedType === "truefalse" && <TrueFalse {...commonProps} />}
      {selectedType === "essay" && <Essay {...commonProps} />}
    </div>
  );
}

export default AddQuestionForm;

