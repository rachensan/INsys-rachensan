import React, {useState} from 'react'
import InputField from '../../components/InputFields';
import Button from '../../components/Buttons';
import SelectField from '../../components/SelectFields';

function TrueFalse({ id, question, options, correctAnswer, points, onSave }) {
  const [editQuestion, setEditQuestion] = useState(question || "");
  const [editAnswer, setEditAnswer] = useState(correctAnswer);
  const [editPoints, setEditPoints] = useState(points || 1);
  const questionType = 'truefalse';

  const [isEditing, setIsEditing] = useState(false);

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
        correctAnswer: editAnswer,
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