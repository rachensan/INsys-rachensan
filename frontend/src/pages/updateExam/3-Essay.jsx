import React, {useState} from "react";

import Button from '../../components/Buttons.jsx'
import InputField from '../../components/InputFields.jsx'


function Essay({ id, questionText, points, onSave, defaultEditing = true }) {
  const [editQuestion, setEditQuestion] = useState(questionText || "");
  const [editPoints, setEditPoints] = useState(points || 1);
  const questionType = 'essay';

  const [isEditing, setIsEditing] = useState(defaultEditing);

  const handleClick = () => {
    if (isEditing) {
      if (!editQuestion.trim()) {
        alert("Please fill in all fields.");
        return;
      }
      onSave({
        questionId: id,
        questionText: editQuestion,
        questionType: questionType,
        points: editPoints,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
    <div className="essayDiv">
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
      name="question"
      value={editQuestion}
      onChange={(e) => setEditQuestion(e.target.value)}
      disabled={!isEditing}
    />
    </div>
    </>
    
    );
}

export default Essay;