import {db} from '../../db.js';

export const createExam = async(req, res) => {
  const { title, schedule, status } = req.body //add section_takers and subj code next time
  const randomExamCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    const result = await db.query('INSERT INTO examinations (title, schedule, status, exam_code) VALUES($1, $2, $3, $4)', [title, schedule, status, randomExamCode]
    );
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error cant CREATE exams', error)
    res.status(500).json({error: 'Failed to CREATE exam'});
  }
}
