import React, {useState} from 'react'

function TrueFalse({exam, onSave}) {
  const [isSaving, setIsSaving] = useState(false);
  const [question, setQuestion] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSaveQuestion = () => {
    if (!isSaving) {
      const newQuestion = {
          id: Date.now(),
          question,
          correctAnswer,
          type: "truefalse"
      };
      onSave(newQuestion); // pass the saved question to parent
      console.log("Saved Question Object:", newQuestion);
    }
    console.log("exam:", exam);
    setIsSaving(!isSaving);
  }


  return (
    <>
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

    </>
    
  )
}

export default TrueFalse;