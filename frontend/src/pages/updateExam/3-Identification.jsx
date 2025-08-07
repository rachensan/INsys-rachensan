import React, {useState} from "react";

import Button from '../../components/Buttons.jsx'
import InputField from '../../components/InputFields.jsx'


function Identification({ questionId, questionText, correctAnswer, points, onSave, defaultEditing = true }) {
  const [editQuestion, setEditQuestion] = useState(questionText || "");
  const [editAnswer, setEditAnswer] = useState(correctAnswer || "");
  const [editPoints, setEditPoints] = useState(points || 1);
  const questionType = 'identification';

  const [isEditing, setIsEditing] = useState(defaultEditing);

  const handleClick = () => {
    if (isEditing) {
      if (!editQuestion.trim() || !editAnswer.trim()) {
        alert("Please fill in all fields.");
        return;
      }
      onSave({ //camelCase, POST(req.body), we are not GETting
        questionId: questionId,
        questionText: editQuestion,
        questionType: questionType,
        correctAnswer: editAnswer,
        points: editPoints,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
    <div className="identificationDiv">
      <Button label={isEditing ? "Save" : "Edit"} onClick={handleClick} />
    <InputField className="points" 
      label="Points"
      type="number"
      name="points"
      value={editPoints}
      min={1}
      onChange={(e) => setEditPoints(Math.max(1, parseInt(e.target.value) || 1))}
      disabled={!isEditing}
    />
    <InputField className="question-text"
      label="Question"
      name="questionText"
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
    </div>
    </>
    
    );
}

export default Identification;