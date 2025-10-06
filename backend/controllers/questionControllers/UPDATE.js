import {db} from '../../db.js';

export const updateQuestion = async (req, res) => {
  const { questionId, examId } = req.params;
  const userId = req.user.userId;
  const {
    questionType,
    questionText,
    correctAnswer,
    options,
    points
  } = req.body;

  const [optionA, optionB, optionC, optionD] = options || [];

  if (options && options.length > 0) {
    const choices = [optionA, optionB, optionC, optionD];
    if (!choices.includes(correctAnswer)) {
      return res.status(400).json({ error: 'correct_answer must match one of the choices' });
    }
  }

  try {
    const result = await db.query(
      `UPDATE questions SET 
        question_type = $1,
        question_text = $2,
        option_a = $3,
        option_b = $4,
        option_c = $5,
        option_d = $6,
        correct_answer = $7,
        points = $8
      WHERE question_id = $9
        AND user_id = $10
        AND exam_id = $11
      RETURNING *`,
      [
        questionType,
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        points,
        questionId,
        userId,
        examId
      ]
    );

    //recalculate for total exam points
    await db.query(`
      UPDATE examinations e
      SET total_points = (
        SELECT COALESCE(SUM(q.points), 0)
        FROM questions q
        WHERE q.exam_id = e.exam_id
      )
      WHERE e.exam_id = $1::int
    `, [examId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
};
