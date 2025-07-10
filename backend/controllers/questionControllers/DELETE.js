import {db} from '../../db.js';

export const deleteQuestionById = async(req, res) => {
  const { questionId, examId } = req.params;

  try {
    const result = await db.query('DELETE FROM questions WHERE question_id = $1 AND exam_id = $2 RETURNING *', [questionId, examId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found for this exam' })
    }

    res.status(200).json({ message: 'Question deleted', deleted: result.rows[0] });

  } catch (error) {
    console.error('Error cant DELETE question', error)
    res.status(500).json({error: 'Failed to DELETE question'});
  }
}

