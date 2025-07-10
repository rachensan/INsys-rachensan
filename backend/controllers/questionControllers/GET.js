import {db} from '../../db.js';

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