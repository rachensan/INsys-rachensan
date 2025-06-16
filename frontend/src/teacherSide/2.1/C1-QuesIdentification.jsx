import React, { useRef, useState } from "react";

function QuesIdentification(props) {
    const [isSaving, setIsSaving] = useState(false);
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const handleSaveQuestion = () => {
        if (!isSaving) {
            const newQuestion = {
                id: props.id,
                question,
                correctAnswer,
                type: "identification"
            };
            props.onSave(newQuestion); // pass the saved question to parent
            console.log("Saved Question Object:", newQuestion);
        }

        setIsSaving(!isSaving);
    };

    return (
        <div className="identificationDiv">
            <button className='editTitleBTN' onClick={handleSaveQuestion}
            >
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
{/* INPUTING RIGHT ANSWER*/}
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
        );
}

export default QuesIdentification;