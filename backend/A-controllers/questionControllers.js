import { examList } from "./examControllers.js";

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