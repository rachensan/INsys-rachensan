import {db} from '../../db.js';


export const createQuestion = async(req, res) => {
  //IDENTIFICATION
  //TRUE OR FALSE
  //MULTIPLE-CHOCIE
  //ESSAY
  
  const { questionType, question, correctAnswer, options, examId, userId } = req.body 
  //examId and userId are TEMPORARY CUZ WE DONT HAVE REGISTER AND LOGIN YET
  //from front-end so keep it camelCase
  const [optionA, optionB, optionC, optionD] = options || [];

  if (options && options.length > 0) {
    const choices = [optionA, optionB, optionC, optionD];
    if (!choices.includes(correctAnswer)) {
      return res.status(400).json({ error: 'correct_answer must match one of the choices' });
    }
  }
  
  try {
    const result = await db.query('INSERT INTO questions(exam_id, user_id, question_type, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [examId, userId, questionType, question, optionA, optionB, optionC, optionD, correctAnswer]);

    res.status(201).json(result.rows[0])
    
  } catch (error) {
    console.error('Error cant CREATE question', error)
    res.status(500).json({error: 'Failed to CREATE question'});
  }
}