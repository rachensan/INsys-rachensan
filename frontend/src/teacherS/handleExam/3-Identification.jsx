import React, {useState} from "react";

function Identification({exam, id, onSave}) {
  const [ques, setQues] = useState('');
  const [ans, setAns] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveQuestion = () => {
    if (!isSaving) {
      const newQuestion = {
        id: id,
        question: ques,
        ans: ans, 
        type: 'identification'
      }
      onSave(newQuestion); //pass to parent
      console.log("Saved Question Object:", newQuestion);
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
          value={ques}
          onChange={(e) => setQues(e.target.value)}
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