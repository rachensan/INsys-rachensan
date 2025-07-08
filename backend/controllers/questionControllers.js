import examList from "./data/examList.js";
import {db} from '../db.js';
//create and view questions


export const createQuestion = async(req, res) => {
  const { questionType, question, correctAnswer, options, examId, userId } = req.body 
  //examId and userId are TEMPORARY CUZ WE DONT HAVE REGISTER AND LOGIN YET
  //from front-end so keep it camelCase
  const [optionA, optionB, optionC, optionD] = options || [];

  try {
    const result = await db.query('INSERT INTO questions(exam_id, user_id, question_type, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [examId, userId, questionType, question, optionA, optionB, optionC, optionD, correctAnswer]);

    res.status(201).json(result.rows[0])
    
  } catch (error) {
    console.error('Error cant CREATE question', error)
    res.status(500).json({error: 'Failed to CREATE question'});
  }
}

export const deleteQuestionById = async(req, res) => {
  const { questionId, examId } = req.params;

  try {
    const result = await db.query('DELETE FROM questions WHERE exam_item_id = $1 AND exam_id = $2 RETURNING *', [questionId, examId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found for this exam' })
    }

    res.status(200).json({ message: 'Question deleted', deleted: result.rows[0] });

  } catch (error) {
    console.error('Error cant DELETE question', error)
    res.status(500).json({error: 'Failed to DELETE question'});
  }
}


export const getQuestionsByExamId = async(req, res) => {
  const {examId} = req.params
  try {
    const result = await db.query("SELECT * FROM questions WHERE exam_id = $1", [examId]);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error('Error cant GET questionsSs (plural to sis)', error)
    res.status(500).json({error: 'Failed to GET questionsSs'});
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