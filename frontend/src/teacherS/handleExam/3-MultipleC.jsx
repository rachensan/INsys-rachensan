import React, {useState} from 'react'

function MultipleChoice({ exam, id, question: initialQuestion, options: initialOptions, correctAnswer: initialCorrectAnswer, onSave, formId }) {
  const [question, setQuestion] = useState(initialQuestion || '');
  const [correctAnswer, setCorrectAnswer] = useState(initialCorrectAnswer || '');
  const [choices, setChoices] = useState(initialOptions || ['', '', '']);

  const [isSaving, setIsSaving] = useState(false);
  

  // Combine ALL wrong choices and correct answer in one array for shuffling later
  const allChoices = [...choices, correctAnswer];

  const handleSaveQuestion = () => {
    if (!isSaving) {
      const newQuestion = {
          id: id,
          type: "multiplechoice",
          question,
          options: choices,
          correctAnswer,
          
      };
      onSave(newQuestion); // pass the saved question to parent
      console.log("Saved Question Object:", newQuestion);
      //we wont shuffle here pala, we shuffle sa student side para di magulo logic sa teacher-side
      console.log("All Options to shuffle latur:", allChoices); 
    }
    console.log("exam:", exam);
    setIsSaving(!isSaving);
  }


  return (
    <>
    <div className='multiplechoiceDiv'>
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
{/* INPUTING WRONG CHOICES/OPTIONS*/}
      <div>
        <p> Choices: </p>
        {choices.map((choice, index) => (
          <div key={index}>
            <input
              type="text"
              value={choice}
              onChange={(e) => {
                const updated = [...choices];
                updated[index] = e.target.value;
                setChoices(updated);
              }}
              placeholder={`Option ${index + 1}`}
              disabled={isSaving}
            />
          </div>
        ))}
    </div>
{/* INPUTING THE ACTUAL RIGHT ANSWER*/}
    <div>
      <p>Correct Answer:</p>
      <input 
        type="text" 
        value={correctAnswer} 
        onChange={(e) => setCorrectAnswer(e.target.value)} 
        placeholder="Type the correct answer"
        disabled={isSaving}
      />
      </div>
    </div>
      
    </>
    
  )
}
export default MultipleChoice;