import {db} from '../../db.js';


export const createQuestion = async(req, res) => {
  //IDENTIFICATION
  //TRUE OR FALSE
  //MULTIPLE-CHOICE
  //ESSAY
  const { examId } = req.params;
  const userId = req.user.userId;
  const { questionType, questionText, correctAnswer, options, points } = req.body 

  //from front-end so keep it camelCase
  const [optionA, optionB, optionC, optionD] = options || [];

  if (options && options.length > 0) {
    const choices = [optionA, optionB, optionC, optionD];
    if (!choices.includes(correctAnswer)) {
      return res.status(400).json({ error: 'correct_answer must match one of the choices' });
    }
  }
  
  try {
    //1--insert question info
    const result = await db.query(
      `INSERT INTO questions (
        exam_id, user_id, question_type, question_text, 
        option_a, option_b, option_c, option_d, correct_answer, points
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`, 
      [examId, userId, questionType, questionText, optionA, optionB, optionC, optionD, correctAnswer, points]
    );

    //2--update total exam points
    await db.query(`
      UPDATE examinations e
      SET total_points = (
        SELECT COALESCE(SUM(q.points), 0)
        FROM questions q
        WHERE q.exam_id = e.exam_id
      )
      WHERE e.exam_id = $1
    `, [examId]);

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error cant CREATE question', error)
    res.status(500).json({error: 'Failed to CREATE question'});
  }
}