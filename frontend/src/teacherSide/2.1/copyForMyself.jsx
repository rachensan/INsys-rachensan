import React, { useRef, useState } from "react";

function QuesIdentification() {

    const questionRef = useRef();
    const answerRef = useRef();

// this is for question button edit: 'editQuesBTN'
    const [isQuesEditable, setIsQuesEditable] = useState(false); // default to false 
// this is for answer button edit: 'editAnsBTN'
    const [isAnsEditable, setIsAnsEditable] = useState(false); // matic true to kase input sya which means we can edit evrytime

    const [question, setQuestion] = useState("Enter Question...");
    const [answer, setAnswer] = useState("");

    const handleQuestionEditClick = () => {
        if (isQuesEditable) {
            const newQuestion = questionRef.current.innerText; // innerText becoz <h1+>, <p>, <whatever except input>
            setQuestion(newQuestion);
                                                    console.log("Saved Question:", newQuestion);
            // save to backend/state/etc.
        }
        setIsQuesEditable(!isQuesEditable);
    };

    const handleSaveAnswer = () => {
        if (isAnsEditable) { //this has value of = useState(false);
            const newAnswer = answerRef.current.value; // value becoz <input>
            setAnswer(newAnswer);
                                                    console.log("Saved Answer:", newAnswer);
        }
            setIsAnsEditable(!isAnsEditable); // Flip the mode: Edit ↔ Save
    };

    return (
        <>
        
        <div className="identificationDiv">
            <button className='editQuesBTN' onClick={handleQuestionEditClick}>
                {isQuesEditable ? 'Save' : 'Edit'}
            </button>

            <h3
                ref={questionRef} //variable to kunwari kung ano value sa isusulat/edit sa h3
                contentEditable={isQuesEditable}
                suppressContentEditableWarning={true}
                spellCheck={false}
                draggable={false}
                style={{ 
                    border: isQuesEditable ? '1px dashed gray' : 'none', 
                    padding: '4px',
                    outline: 'none',
                    userSelect: 'none',
                    pointerEvents: isQuesEditable ? 'auto' : 'none' 
                }}
            >
                {question}
            </h3>
            <br/>
            <input 
                placeholder="enter correct answer" 
                ref={answerRef} // need ata ng array dito, kase marami gagawing questions and answers
                defaultValue={answer} // shows your saved answer inside the box without needing value= + onChange
                disabled={!isAnsEditable}

                // put ts here kase input gamit natin, nadoddouble click and copy/paste sya nakakainis
                // but NOT really NEEDED kase teacher side naman to
                onMouseDown={(e) => !isAnsEditable && e.preventDefault()}
                onFocus={(e) => !isAnsEditable && e.target.blur()} // user can't type, select, or interact with it — even if it looks like they can.
                onCopy={(e) => !isAnsEditable && e.preventDefault()} // blocks CTRL+C
                //bish did all these para lang palitan ng input na may mas onting coding
                style={{ 
                    border: isAnsEditable ? '1px dashed gray' : 'none', 
                    padding: '4px',
                    outline: 'none',
                    userSelect: 'none', // disables selection when not editing
                    pointerEvents: isAnsEditable ? 'auto' : 'none' // prevent accidental edits when disabled
                }}
            />
            <button onClick={handleSaveAnswer}>
                {isAnsEditable ? 'Save' : 'Edit'}
            </button>
        </div>
            
        </>
    );
}

export default QuesIdentification;