import examList from "./data/examList.js";
import {db} from '../db.js';
//create and view questions


export const createQuestion = async(req, res) => {
  const { questionType, question, correctAnswer, options, examId, userId } = req.body 
  //examId and userId are TEMPORARY CUZ WE DONT HAVE REGISTER AND LOGIN YET
  //from front-end so keep it camelCase
  const [optionA, optionB, optionC, optionD] = options || [];

  try {
    const result = await db.query('INSERT INTO examination_item(exam_id, user_id, question_type, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [examId, userId, questionType, question, optionA, optionB, optionC, optionD, correctAnswer])
  } catch (error) {
    console.error('Error cant CREATE question', error)
    res.status(500).json({error: 'Failed to CREATE question'});
  }
}

// //POST
// export const createQuestion = (req, res) => { //this is from the temporary sht cuz i dont have db yet
//   const examId = parseInt(req.params.id);
//   const { questionType, question, correctAnswer, options } = req.body //not a new declaration, kinukuha lang natin sa front end

//   const newQuestion = {
//     id: Date.now(), //temporary shyt
//     questionType,
//     question,
//     correctAnswer,
//     options: options || [] //for multiplechoice
//   }

//   const exam = examList.find(e => e.id === examId);
//   if (!exam) {
//     return res.status(404).json({ message: 'Exam not found' })
//   }

//   exam.questions.push(newQuestion);
//   console.log("fkn hell", examList[0].questions)
//   res.status(200).json(newQuestion);
// }



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