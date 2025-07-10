import {db} from '../../db.js';

export const deleteExam = async(req, res) => {
  const { examId } = req.params;

  try {
    const result = await db.query("DELETE FROM examinations WHERE exam_id = $1 RETURNING *", [examId]);

    if(result.rows.length === 0) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting the exam', error);
    res.status(500).json({ error: 'Failed to delete exam' });
  }
}