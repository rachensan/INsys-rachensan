import React, {useState} from 'react'

import Button from '../../components/Buttons.jsx'
import InputField from '../../components/InputFields.jsx'

function MultipleChoice({ questionId, questionText, options, correctAnswer, points, onSave, defaultEditing = true }) {
  const [editQuestion, setEditQuestion] = useState(questionText || "");
  const [choices, setChoices] = useState(options || ['', '', '', '']);
  const [editAnswer, setEditAnswer] = useState(correctAnswer || "");
  const [editPoints, setEditPoints] = useState(points || 1);
  const questionType = 'multiplechoice';
  
  const [isEditing, setIsEditing] = useState(defaultEditing);

  const handleClick = () => {
    if (isEditing) {
      if (!editQuestion.trim() || !editAnswer.trim()) {
        alert("Please fill in all fields.");
        return;
      }
      if (!choices.includes(editAnswer)) {
        alert("Answer should be one of the choices");
        return;
      }


      onSave({
        questionId: questionId,
        questionText: editQuestion,
        questionType: questionType,
        options: choices,
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
    <div className='multiplechoiceDiv'>
      <Button label={isEditing ? "Save" : "Edit"} onClick={handleClick} />
      <br/>
      <InputField className="points" 
        label="Points"
        type="number"
        name="points"
        value={editPoints}
        min={1}
        onChange={(e) => setEditPoints(Math.max(1, parseInt(e.target.value) || 1))}
        disabled={!isEditing}
      />
      
      <div>
        <InputField className="question-text"
          label="Question"
          name="questionText"
          value={editQuestion}
          onChange={(e) => setEditQuestion(e.target.value)}
          placeholder="Type the question here"
          disabled={!isEditing}
        />
      </div>

{/* INPUTING WRONG CHOICES/OPTIONS*/}
      <div>
        {choices.map((choice, index) => (
          <InputField
            key={index}
            className="choices-text"
            label={`${String.fromCharCode(65 + index)}:`}
            name={`option${index}`}
            value={choice}
            onChange={(e) => {
              const updated = [...choices];
              updated[index] = e.target.value;
              setChoices(updated);
            }}
            placeholder={`Option ${index + 1}`}
            disabled={!isEditing}
          />
        ))}
      </div>
      
{/* INPUTING THE ACTUAL RIGHT ANSWER*/}
      <div>
        <InputField className="answer-text" 
          label="Correct Answer"
          name="correctAnswer"
          value={editAnswer}
          onChange={(e) => setEditAnswer(e.target.value)}
          placeholder="Type the correct answer"
          disabled={!isEditing}
        />
      </div>
    </div>
      
    </>
    
  )
}
export default MultipleChoice;