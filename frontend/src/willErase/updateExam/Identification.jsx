import React, {useState} from "react";
import axios from 'axios';


function Identification({ exam, id, question: initialQuestion, correctAnswer: initialAnswer, onSave }) {
  const [question, setQuestion] = useState( initialQuestion || '' );
  const [ans, setAns] = useState( initialAnswer  || '' );
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveQuestion = () => {
    console.log("handleSaveQuestion called");

    if (!isSaving) {

      const newQuestion = {
        id: id,
        questionType: 'identification',
        question: question,
        correctAnswer: ans, 
      } 
      console.log("Exam ID:", exam?.id)
      console.log("New Question:", newQuestion)


    //POST


    
      axios.post(`http://localhost:3000/api/exams/${exam.id}/questions`, {
        ...newQuestion,
      })
        .then(() => {//pass to parent --- “I’m done saving, now tell the parent ( AllQuestions() ).”
          axios.get(`http://localhost:3000/api/exams/${exam.id}`)
            .then(res => onSave(res.data));
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