import React, {useState} from "react";
import axios from "../../utils/axiosConfig.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";


import Button from '../../components/Buttons.jsx'
import InputField from '../../components/InputFields.jsx'


function Identification({ id, question, correctAnswer, points, onSave }) {
  const [editQuestion, setEditQuestion] = useState(question);
  const [editAnswer, setEditAnswer] = useState(correctAnswer);
  const [editPoints, setEditPoints] = useState(points);

  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    if (isEditing) {
      onSave({
        question_id: id,
        question_text: editQuestion,
        correct_answer: editAnswer,
        points: editPoints,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
    <InputField className="question-text"
      label="Question"
      name="question"
      value={editQuestion}
      onChange={(e) => setEditQuestion(e.target.value)}
      disabled={!isEditing}
    />

    <InputField className="answer-text" 
      label="Correct Answer"
      name="correctAnswer"
      value={editAnswer}
      onChange={(e) => setEditAnswer(e.target.value)}
      disabled={!isEditing}
    />

    <InputField className="points" 
      label="Points"
      type="number"
      name="points"
      value={editPoints}
      onChange={(e) => setEditPoints(e.target.value)}
      disabled={!isEditing}
    />
    <div className="identificationDiv">

      <Button label={isEditing ? "Save" : "Edit"} onClick={handleClick} />
    </div>
    </>
    
    );
}

export default Identification;