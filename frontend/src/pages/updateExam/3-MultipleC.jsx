import React, {useState} from 'react'

import Button from '../../components/Buttons.jsx'
import InputField from '../../components/InputFields.jsx'

function MultipleChoice({ id, question, options, correctAnswer, points, onSave }) {
  const [editQuestion, setEditQuestion] = useState(question);
  const [choices, setChoices] = useState(options || ['', '', '', '']);
  const [editAnswer, setEditAnswer] = useState(correctAnswer);
  const [editPoints, setEditPoints] = useState(points);
  
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    if (isEditing) {
      onSave({
        question_id: id,
        question_text: editQuestion,
        options: choices,
        correct_answer: editAnswer,
        points: editPoints,
      });
    }
    setIsEditing(!isEditing);
  };


  return (
    <>
    <div className='multiplechoiceDiv'>
      <Button label={isEditing ? "Save" : "Edit"} onClick={handleClick} />
      <br/>
      <div>
        <InputField className="question-text"
          label="Question"
          name="question"
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