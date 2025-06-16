import React, { useState } from "react";

function QuesTrueFalse(props) {

    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("True");

    const [isSaving, setIsSaving] = useState(false);

    const handleSaveQuestion = () => {
    if (!isSaving) {
        const newQuestion = {
            id: props.id,
            question,
            correctAnswer,
            type: "truefalse"
        };
        props.onSave(newQuestion); // pass the saved question to parent
        console.log("Saved question:", newQuestion);
        // save to DB here if needed
    }
    setIsSaving(!isSaving);
    };

    return (
        <div className="truefalseDiv">
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

            <button className='editTitleBTN' onClick={handleSaveQuestion}>
                {isSaving ? 'Edit' : 'Save' }
            </button>
        </div>
    );
}

export default QuesTrueFalse;