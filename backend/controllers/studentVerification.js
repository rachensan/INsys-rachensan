import {db} from '../db.js';

export const verifyExamAccess = async(req, res) => {
  const {inputCode, inputSection} = req.body;

  try {
    const result = await db.query(
      `SELECT * FROM examinations 
       JOIN section_takers ON examinations.exam_id = section_takers.exam_id 
       WHERE exam_code = $1 AND section_name = $2`,
      [inputCode, inputSection]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid code or section' });
    }

    res.status(200).json({ message: 'Exam entry granted', exam: result.rows[0] });
  } catch (error) {
    console.error('Error verifying exam entry:', error);
    res.status(500).json({ error: 'Failed to enter exam' });
  }
  
}