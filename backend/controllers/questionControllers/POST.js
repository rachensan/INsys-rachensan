import {db} from '../../db.js';

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