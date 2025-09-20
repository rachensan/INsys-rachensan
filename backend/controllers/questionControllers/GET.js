import {db} from '../../db.js';

export const getQuestionsForStudent = async(req, res) => {
  const {examId} = req.params;
  try {
    //1.Fetch objective-type questions
    const objectives = await db.query(`
      SELECT question_id, question_text, question_type, option_a, option_b, option_c, option_d, points 
        FROM questions 
      WHERE exam_id = $1
        AND question_type IN ('multiplechoice', 'truefalse', 'identification')`
      , [examId]);

    //2.Fetch essay-type questions
    const essays = await db.query(`
      SELECT question_id, question_text, question_type, points
        FROM questions
        WHERE exam_id = $1
        AND question_type = 'essay'`
      , [examId])

    //3.Return these two, grouped
    res.status(200).json({
      objectives: objectives.rows,
      essays: essays.rows
    });
  } catch (error) {
    console.error('Error cant GET questionsSs (plural to sis)', error)
    res.status(500).json({error: 'Failed to GET questionsSs'});
  }
}


//checking unanswered questions, so student can resume to answering the unanswered questions when accidentally exited the page
export const getUnansweredQuestions = async(req, res) => {
  const {examId} = req.params;
  const studentId = req.user.schoolId;

  try {
    //1.Unanswered objective-type questions
    const objectives = await db.query(`
      SELECT q.question_id, q.question_text, q.question_type, q.option_a, q.option_b, q.option_c, q.option_d, q.points 
        FROM questions q
      LEFT JOIN student_answers sa
        ON sa.question_id = q.question_id
        AND sa.exam_id = $1
        AND sa.student_school_id = $2
      WHERE q.exam_id = $1
        AND q.question_type IN ('multiplechoice', 'truefalse', 'identification')
        AND sa.question_id IS NULL`
      , [examId, studentId]);

    //2.Unanswered essay-type questions
    const essays = await db.query(
      `SELECT q.question_id, q.question_text, q.question_type, q.points
       FROM questions q
       LEFT JOIN essay_answers ea
         ON ea.question_id = q.question_id
         AND ea.student_school_id = $2
       WHERE q.exam_id = $1
         AND q.question_type = 'essay'
         AND ea.question_id IS NULL`
      , [examId, studentId]);
    
    // 3. Return grouped
    res.status(200).json({
      objectives: objectives.rows,
      essays: essays.rows,
    });
  } catch (error) {
    console.error('Error cant GET unanswered questions', error)
    res.status(500).json({error: 'Failed to GET unanswered questions'});
  }
}