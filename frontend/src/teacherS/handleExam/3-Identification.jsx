import React, {useState} from "react";
import axios from 'axios';


function Identification({ exam, id, question: initialQuestion, correctAnswer: initialAnswer, onSave, formId }) {
  const [question, setQuestion] = useState( initialQuestion || '' );
  const [ans, setAns] = useState( initialAnswer  || '' );
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveQuestion = () => {
    if (!isSaving) {
      const newQuestion = {
        id: id,
        type: 'identification',
        question: question,
        correctAnswer: ans, 
      } 
    //POST
      axios.post(`http://localhost:3000/api/exams/${exam.id}/questions`, {
        ...newQuestion,
      })
        .then ( ()=> {
          onSave(res.data); //pass to parent
          console.log("Saved Question Object:", res.data);
        })
        .catch(err => console.error(err)); 
    }
    // console.log("exam:", exam);
    setIsSaving(!isSaving);

    


  }

  return (
    <div className="identificationDiv">
      <button className='editTitleBTN' onClick={handleSaveQuestion}
      > {isSaving ? 'Edit' : 'Save' }
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
{/* INPUTING RIGHT ANSWER*/}
      <div>
        <p>Correct Answer:</p>
        <input 
          type="text" 
          value={ans} 
          onChange={(e) => setAns(e.target.value)} 
          placeholder="Type the correct answer"
          disabled={isSaving}
        />
      </div>
    </div>
    );
}

export default Identification;