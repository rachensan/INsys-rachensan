import { examList } from "./examControllers.js";

export const fkdeletethis_justForViewing = [
  {
    id: 1,
    title: "Midterm Exam",
    schedule: "June 20, 2025 at 2:00PM",
    status: "ongoing",
    sections: [],
    questions: [
      {
        id: 1,
        questionType: "multiplechoice",
        question: "multiple choice question here",
        correctAnswer: "Choice A",
        options: ["Choice Ampota", "Choice Bonak", "Choice Chihuahua"],
      },
      {
        id: 2,
        questionType: "truefalse",
        question: "true or false question here",
        correctAnswer: 'True',
      },
      {
        id: 3,
        questionType: "identification",
        question: "identification question here",
        correctAnswer: "okay beh"
      }
    ]
  },
]

//POST
export const createQuestion = (req, res) => {
  const examId = parseInt(req.params.id);
  const { questionType, question, correctAnswer, options } = req.body //not a new declaration, kinukuha lang natin sa front end

  const newQuestion = {
    id: Date.now(), //temporary shyt
    questionType,
    question,
    correctAnswer,
    options: options || [] //for multiplechoice
  }

  const exam = examList.find(e => e.id === examId);
  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' })
  }

  exam.questions.push(newQuestion);
  res.status(200).json(newQuestion);
}







//GET
export const viewAllQuestions = (req, res) => {
  res.json(examList[0].questions) //temporary [0]
}

export const getQuestionsPerExamId = (req, res) => {
  const id = parseInt(req.params.id);
  const exam = examList.find(e => e.id === id)

  if (!exam) {
    return res.status(404).json({message: 'Exam not found'})
  }

  res.json(exam.questions)
}