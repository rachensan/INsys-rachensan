import React, { useRef, useState } from "react";

function QuesMultiChoice(props) {
    const [isSaving, setIsSaving] = useState(false);
    const [question, setQuestion] = useState("");

    const handleSaveQuestion = () => {
        if (!isSaving) {
            const newQuestion = {
                id: props.id,
                question,
                options: choices,
                correctAnswer,
                type: "multiplechoice"
            };
            props.onSave(newQuestion); // pass the saved question to parent

            console.log("Saved Question Object:", newQuestion);
            // console.log("All Options to shuffle latur:", [...choices, correctAnswer]);
        }

        setIsSaving(!isSaving);
    };

    const [correctAnswer, setCorrectAnswer] = useState("");
    const [choices, setChoices] = useState(["", "", ""]);

    // Combine ALL wrong choices and correct answer in one array for shuffling later
    const allChoices = [...choices, correctAnswer];

    return (
        <div className="multiplechoiceDiv">

            <button className='editTitleBTN' onClick={handleSaveQuestion}>
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
        );
    }

export default QuesMultiChoice;
