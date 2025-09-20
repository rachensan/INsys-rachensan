import {db} from '../../db.js';

export const getQuestionsForStudent = async(req, res) => {
  const {examId} = req.params;
  try {
    const result = await db.query(
      `SELECT question_id, question_text, question_type, option_a, option_b, option_c, option_d, points 
      FROM questions 
      WHERE exam_id = $1`, [examId]
    );
    res.status(201).json(result.rows);
  } catch (error) {
    console.error('Error cant GET questionsSs (plural to sis)', error)
    res.status(500).json({error: 'Failed to GET questionsSs'});
  }
}


//checking unanswered questions, so student can resume to answering when accidentally exited
export const getUnansweredQuestions = async(req, res) => {
  const {examId} = req.params;
  const studentId = req.user.schoolId;

  try {
    const result = await db.query(
      `SELECT q.question_id, q.question_text, q.question_type, q.option_a, q.option_b, q.option_c, q.option_d, q.points 
      FROM questions q
      LEFT JOIN student_answers sa
        ON sa.question_id = q.question_id
        AND sa.exam_id = $1
        AND sa.student_school_id = $2
      WHERE q.exam_id = $1
        AND sa.question_id = IS NULL
        AND ea.question_id = IS NULL
      ` [examId, studentId])
      
  } catch (error) {
    console.error('Error cant GET unanswered questions', error)
    res.status(500).json({error: 'Failed to GET unanswered questions'});
  }
}