import React, {useState} from 'react'
import InputField from '../../components/InputFields';
import Button from '../../components/Buttons';
import SelectField from '../../components/SelectFields';

function TrueFalse({ id, question, options, correctAnswer, points, onSave }) {
  const [editQuestion, setEditQuestion] = useState(question);
  const [choices, setChoices] = useState(options || ['True', 'False']);
  const [editAnswer, setEditAnswer] = useState(correctAnswer);
  const [editPoints, setEditPoints] = useState(points);

  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

    const handleClick = () => {
    if (isEditing) {
      onSave({
        question_id: id,
        question_type: 'truefalse',
        question_text: editQuestion,
        correct_answer: editAnswer,
        points: editPoints,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
    <div className='truefalseDiv'>
      <Button label={isEditing ? "Save" : "Edit" } onClick={handleClick} />
      <br/>

      <div>
        <InputField className="question-text"
          label="Question:"
          name="question"
          value={editQuestion}
          onChange={(e) => setEditQuestion(e.target.value)}
          placeholder="Type the question here"
          disabled={!isEditing}
        />
      </div>

      <div>

        <label>Correct Answer:</label>
          <select
            name="truefalse"
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            disabled={!isEditing} 
          >
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
      </div>
    </div>
    </>
  )
}

export default TrueFalse;