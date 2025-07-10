import {db} from '../../db.js';

export const getAllExams = async(req, res) =>{

  try {
    const result = await db.query("SELECT * FROM examinations")
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error cant GET exams', error)
  }

} 

export const getExamsByTitle = async(req, res) => { //for searbar sorting
  const { title } = req.query;

  try {
    const result = await db.query("SELECT * FROM examinations WHERE title ILIKE $1", [`%${title}%`]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Searched exam not found' })
    }

    res.status(200).json(result.rows) //no [0] because there might be several results
  } catch (error) {
    console.error('Error searching exams by title', error);
    res.status(500).json({ error: 'Failed to search exams' });
  }
}

export const getExamById = async(req, res) => {
  const {examId} = req.params;
  try {
    const result = await db.query("SELECT * FROM examinations WHERE exam_id = $1", [examId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    res.status(200).json(result.rows[0]);
    
  } catch (error) {
    console.error('Error cant GET exam', error)
    res.status(500).json({error: 'Failed to GET exam'});
  }
}

export const getExamsByStatus = async(req, res) => {
  const { filter } = req.query;
  try {
    const result = await db.query("SELECT * FROM examinations WHERE status ILIKE $1", [filter]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error searching exams by status', error);
    res.status(500).json({ error: 'Failed to sort exams' });
  }
}

export const getExamCode = async(req, res) => {
  const { examId } = req.params;

  try {
    const result = await db.query("SELECT exam_code FROM examinations WHERE exam_id = $1", [examId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error cant get exam code', error);
    res.status(500).json({ error: 'Failed to get exam code' });
  }
}

export const getSectionTakersByExamId = async (req, res) => {
  const { examId } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM section_takers WHERE exam_id = $1",
      [examId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Section/s not assigned yet' })
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting section takers', error);
    res.status(500).json({ error: 'Failed to fetch section takers' });
  }
};