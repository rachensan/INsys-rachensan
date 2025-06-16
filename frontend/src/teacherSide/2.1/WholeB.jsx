import { useState, useEffect } from 'react'

import ExamTitle from './A-ExamTitle.jsx';
import SelectedSections from './B-SelectedSections.jsx';
import QuestionDiv from './C-QuestionDiv.jsx';
import { QuestionAdd } from './C-QuestionDiv.jsx';

function WholeB() {

    const [examTitle, setExamTitle] = useState("Untitled Exam");
    const [selectedSections, setSelectedSections] = useState([]); 

    const [questionForms, setQuestionForms] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [questionCounter, setQuestionCounter] = useState(1); //id increment per question

    const handleQuestionSaved = (index, savedQuestion) => {
        setQuestions(prev => [...prev, savedQuestion]); // store question
    };

    useEffect(() => {
        localStorage.setItem('examTitle', examTitle);
    }, [examTitle]);

    useEffect(() => {
        localStorage.setItem('selectedSections', JSON.stringify(selectedSections));
    }, [selectedSections]);

    const newExam = {
        id: Date.now(),
        title: examTitle,
        sections: selectedSections,
        questions: [...yourQuestions]
    };

    const existingExams = JSON.parse(localStorage.getItem("allExams") || "[]");
    localStorage.setItem("allExams", JSON.stringify([...existingExams, newExam]));



    return (
        <>
            <ExamTitle title={examTitle} setTitle={setExamTitle} />
            <br/><br/>
            <SelectedSections selectedSections={selectedSections} setSelectedSections={setSelectedSections} />
            <br/><br/>

            {questionForms.map((form, index) => (
            <QuestionDiv 
                key={form.id} 
                onSave={(savedQuestion) => handleQuestionSaved(index, savedQuestion)}
                id={form.id} />
            ))}

            <QuestionAdd onClick={() => {
                setQuestionForms(prev => [...prev, { id: questionCounter }]);
                setQuestionCounter(prev => prev + 1); //ID per click add question
            }} />

                {/* anonymous function so we dont have to make a seperate short one */}
                {/* showQuestionForm === false, so it shows the add button, then when we click the button, the showQuestionForm will be === true */}
                {/* i also did add || showQuestionForm so when i add question the button is still there to add another */}

            <button onClick={() => {
                localStorage.setItem("examTitle", examTitle);
                localStorage.setItem("selectedSections", JSON.stringify(selectedSections));
                console.log(selectedSections)
                alert("Saved to localStorage!");}}> Save Exam Info
            </button>

        </>
    );
}

export default WholeB;