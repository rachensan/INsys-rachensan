import {db} from '../db.js';

//VERIFY BEFORE ENTERING
export const verifyExamAccess = async(req, res) => {
  const { inputCode, inputSection, studentName, studentSchoolId } = req.body;


  try {
    const result = await db.query( //gives us the exam info
      `SELECT * FROM examinations 
       JOIN section_takers ON examinations.exam_id = section_takers.exam_id 
       WHERE exam_code = $1 AND section_name = $2`,
      [inputCode, inputSection]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid code or section' });
    }

    await db.query(
      `INSERT INTO student_scores (student_school_id, exam_id, section_name, student_name) 
      VALUES ($1, $2, $3, $4)`,
      [studentSchoolId, result.rows[0].exam_id, inputSection, studentName]
    );

    res.status(200).json({ message: 'Exam entry granted', exam: result.rows[0] });
  } catch (error) {
    console.error('Error verifying exam entry:', error);
    res.status(500).json({ error: 'Failed to enter exam' });
  }
  
}

//NOT ESSAY
export const answerSubmission = async(req, res) => {
  const { questionId, studentSchoolId, studentAnswer, examId } = req.body;
      //no req.params because we get the info if they are validated/verified examinee

  try {
    const correctAnswerFromDB = await db.query(
      `SELECT correct_answer FROM questions 
       WHERE exam_id = $1 AND question_id = $2`, 
       [examId, questionId]
    );
    const correctAnswer = correctAnswerFromDB.rows[0]?.correct_answer;

    const isCorrect = correctAnswer && correctAnswer.trim().toLowerCase() === studentAnswer.trim().toLowerCase(); //1 or 0

    const result = await db.query(
      `INSERT INTO student_answers (exam_id, question_id, student_school_id, student_answer, is_correct) VALUES ($1, $2, $3,$4, $5) RETURNING *`,
       [examId, questionId, studentSchoolId, studentAnswer, isCorrect]);

      res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving exam entry:', error);
    res.status(500).json({ error: 'Failed to save answers' });
  }
}

//ESSAY
export const essaySubmission = async(req, res) => {
  const { questionId, studentSchoolId, studentAnswer } = req.body

  try {
    const result = await db.query(
      `INSERT INTO essay_answers (question_id, student_school_id, student_answer) VALUES ($1, $2, $3) RETURNING *`,
       [questionId, studentSchoolId, studentAnswer]);

      res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving essay entry:', error);
    res.status(500).json({ error: 'Failed to save essay' });
  }
}

//CALCULATE SCORE
export const automaticScoring = async(req, res) => {
  const { examId, studentSchoolId } = req.body

  try {
    const result = await db.query(
      `SELECT COUNT(*) AS correct_count
       FROM student_answers
       WHERE exam_id = $1 AND student_school_id = $2 AND is_correct = true`,
      [examId, studentSchoolId]
    );

    const score = parseInt(result.rows[0].correct_count);

    await db.query(
      `UPDATE student_scores
       SET total_score = $1
       WHERE exam_id = $2 AND student_school_id = $3`,
      [score, examId, studentSchoolId]
    );
    res.status(200).json({ message: 'Score updated', score });
  } catch (error) {
    console.error('Automatic scoring failed:', error);
    res.status(500).json({ error: 'Failed to update score' });
  }
}