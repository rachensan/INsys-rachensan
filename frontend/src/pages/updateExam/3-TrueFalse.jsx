import React, {useState} from 'react'
import axios from 'axios';

function TrueFalse({ exam, id, question: initialQuestion, correctAnswer: initialAnswer, onSave, formId }) {
  const [question, setQuestion] = useState( initialQuestion || '' );
  const [correctAnswer, setCorrectAnswer] = useState(initialAnswer || '');

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveQuestion = () => {
    const newQuestion = {
        id: id,
        type: "truefalse",
        question,
        correctAnswer,
    };
    onSave( newQuestion ); // pass the saved question to parent
    
    console.log("Saved Question Object:", newQuestion);
    
    setIsSaving(!isSaving);
  }


  return (
    <>
    <div className='truefalseDiv'>
      <button type="button" className='editTitleBTN' onClick={handleSaveQuestion}>
        {isSaving ? 'Edit' : 'Save' }
      </button>
      <br/>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type the question here"
          disabled={isSaving}
      />
      </div>

      <div>
        <label>Correct Answer:</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            disabled={isSaving} 
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