import examList from "./data/examList.js";



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
  console.log("fkn hell", examList[0].questions)
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