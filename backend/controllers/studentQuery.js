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

  //time validation
    const currentTime = new Date();
    const startTime = new Date(result.rows[0].start_datetime + '+08:00');
    const endTime = new Date(result.rows[0].end_datetime + '+08:00');
/*
    const timeVerification = currentTime > startTime && currentTime < endTime; //currently between start and end.. so we can enter if TRUE

    if (!timeVerification) { //if it's false (not during the exam time)
      return res.status(403).json({ error: 'Exam not available at this time' });
    }
*/

    if (currentTime > endTime) {
      return res.status(403).json({ error: 'Exam has ended' });
    }
    if (currentTime < startTime) {
      return res.status(403).json({ error: 'Exam has not started' });
    }

    const isSubmitted = await db.query(`
      SELECT * FROM student_scores
      WHERE student_school_id = $1
        AND section_name = $2
        AND exam_id = $3
        AND is_submitted = $4
      `, [studentSchoolId, inputSection, result.rows[0].exam_id, true]);

    if (isSubmitted.rows.length === 1) {
      return res.status(403).json({ error: 'You already submitted this exam' });
    } 

    const isStarted = await db.query(`
      SELECT * FROM student_scores
      WHERE student_school_id = $1
        AND section_name = $2
        AND exam_id = $3
        AND is_submitted = $4
      `, [studentSchoolId, inputSection, result.rows[0].exam_id, false]);

    if (isStarted.rows.length === 1) {
      return res.status(200).json({ message: 'Already Allowed. Proceed to exam', exam: result.rows[0] });
    } else {
      await db.query(
      `INSERT INTO student_scores (student_school_id, exam_id, section_name, student_name) 
      VALUES ($1, $2, $3, $4)`,
      [studentSchoolId, result.rows[0].exam_id, inputSection, studentName]
    );
    }

    res.status(200).json({ message: 'Exam entry granted', exam: result.rows[0] });
  } catch (error) {
    console.error('Error verifying exam entry:', error);
    res.status(500).json({ error: error.details || 'Failed to enter exam' });
  }
}

//ALL QUESTION TYPE
export const answerSubmission = async(req, res) => {
  const { questionId, studentSchoolId, studentAnswer, examId } = req.body;
      //no req.params because we get the info if they are validated/verified examinee

  try {

    const isSubmitted = await db.query(`
    SELECT is_submitted FROM student_scores
    WHERE exam_id = $1 AND student_school_id = $2`, 
    [examId, studentSchoolId]);

    if (isSubmitted.rows[0]?.is_submitted) {
      return res.status(400).json({ error: 'Already submitted' });
    }

    const correctAnswerFromDB = await db.query(
      `SELECT correct_answer FROM questions 
       WHERE exam_id = $1 AND question_id = $2`, 
       [examId, questionId]
    );
    const correctAnswer = correctAnswerFromDB.rows[0]?.correct_answer;

    const questionTypeFromDB = await db.query(`SELECT question_type FROM questions WHERE exam_id = $1 AND question_id = $2`, [examId, questionId]);
    const questionType = questionTypeFromDB.rows[0]?.question_type;

    const isCorrect = correctAnswer && correctAnswer.trim().toLowerCase() === studentAnswer.trim().toLowerCase(); //1 or 0

    const didAnswer = await db.query(`
      SELECT student_answer 
      FROM student_answers
      WHERE exam_id = $1
        AND question_id = $2`, [examId, questionId])

    if (didAnswer.rows.length != 0) {
      return res.status(400).json({ error: 'Question already answered' });
    }

    if (questionType === 'essay') {
      const result = await db.query(`INSERT INTO essay_answers 
      (question_id, student_school_id, student_answer) VALUES ($1, $2, $3) RETURNING *`, [questionId, studentSchoolId, studentAnswer]);

       res.status(201).json(result.rows[0]);
    } else {
      const result = await db.query(`INSERT INTO student_answers (exam_id, question_id, student_school_id, student_answer, is_correct) VALUES ($1, $2, $3,$4, $5) RETURNING *`,[examId, questionId, studentSchoolId, studentAnswer, isCorrect]);

  //trigger auto score
      await autoScoringHelper(examId, studentSchoolId);
      res.status(201).json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error saving exam entry:', error);
    res.status(500).json({ error: 'Failed to save answers' });
  }
}

//NON-ESSAY SCORING
export const autoScoringTemplate = async(req, res) => { 
  const { examId, studentSchoolId } = req.body

  try {
    const score = await autoScoringHelper(examId, studentSchoolId)
    res.status(200).json({ message: 'Score updated', score });
  } catch (error) {
    console.error('Automatic scoring failed:', error);
    res.status(500).json({ error: 'Failed to update score' });
  }
}

  //helper function:
      async function autoScoringHelper(examId, studentSchoolId) { // use examId & studentSchoolId from autoScoringTemplate

        const result = await db.query(
          `SELECT q.points
            FROM student_answers s, questions q
            WHERE s.exam_id = $1
              AND s.student_school_id = $2
              AND s.is_correct = true
              AND s.question_id = q.question_id`,
          [examId, studentSchoolId]
        ) //will list the points for each correct answers (true)

        let totalScore = 0;

        result.rows.forEach(row => {
          totalScore = totalScore + row.points;
        })
        const score = parseInt(totalScore);

        await db.query(
          `UPDATE student_scores
            SET objective_score = $1,
                total_score = $1 + essay_score
            WHERE exam_id = $2 AND student_school_id = $3`,
          [score, examId, studentSchoolId]
        );

        return score;
      }

//ESSAY SCORING
export const manualEssayScoring = async(req, res) => {
  const {questionId, examId} = req.params;
  const {studentSchoolId, essayScore} = req.body;

  try {
    const result = await db.query(
      `UPDATE essay_answers
        SET essay_score = $1
        WHERE question_id = $2
          AND student_school_id = $3
        RETURNING *`,
      [essayScore, questionId, studentSchoolId]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No essay found to score" });
    }

    await essayScoringHelper(examId, studentSchoolId);
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating essay score:', error);
    res.status(500).json({ error: 'Failed to update score' });
  }
}
    async function essayScoringHelper(examId, studentSchoolId) { 

      const result = await db.query(
        `SELECT SUM(essay_score) AS total_essay_score
        FROM essay_answers
        JOIN questions ON essay_answers.question_id = questions.question_id
        WHERE questions.exam_id = $1 AND essay_answers.student_school_id = $2`,
        [examId, studentSchoolId]
      );

      const totalEssayScore = parseInt(result.rows[0].total_essay_score) || 0;

      await db.query(
        `UPDATE student_scores
          SET essay_score = $1,
              total_score = $1 + objective_score
          WHERE exam_id = $2 AND student_school_id = $3`,
        [totalEssayScore, examId, studentSchoolId]
      );

      return totalEssayScore;
    }


//this is for one exam info 
export const getInfoPerExam = async(req, res) => {
  const { studentId, examId } = req.params;

  try {
    const result = await db.query(`
      SELECT
        e.exam_id, e.title,
        u.full_name AS teacher_name,
        s.section_name, s.submitted_at, s.total_score
      FROM student_scores s
      JOIN examinations e ON s.exam_id = e.exam_id
      JOIN users u ON e.user_id = u.user_id
      WHERE e.exam_id = $1 
        AND s.student_school_id = $2
      `, [examId, studentId]);

      if (result.rows.length === 0) {
        return res.status(404).json({error: 'No Exam detail fetched'})
      }

      res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error getting exam details:', error);
    res.status(500).json({ error: error.details || 'Failed to get exam detail' });
  }
}

export const getStudentExamHistory = async(req, res) => {
  const { studentId } = req.params;

  try {
    const result = await db.query(`
      SELECT
        e.exam_id,
        e.title,
        u.full_name AS teacher_name,
        s.section_name,
        s.submitted_at,
        s.total_score
      FROM student_scores s
      JOIN examinations e ON s.exam_id = e.exam_id
      JOIN users u ON e.user_id = u.user_id
      WHERE s.student_school_id = $1
      ORDER BY s.submitted_at DESC;
      `, [studentId]);

      if (result.rows.length === 0) {
        return res.status(404).json({error: 'No Exam detail fetched'})
      }

      res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error getting exam history details:', error);
    res.status(500).json({ error: error.details || 'Failed to get exam history details' });
  }
}


export const autoSubmitAllAnswers = async (req, res) => {
  const { examId, studentId } = req.params;

  try {

//====== objective questions
    const questionType_Obj = ['multiplechoice', 'identification', 'truefalse']
    const unansweredQuestions_Obj =  await db.query(`
      SELECT q.question_id, s.student_answer
      FROM questions q LEFT JOIN student_answers s
        ON q.question_id = s.question_id
        AND s.student_school_id = $1
      WHERE q.question_type = ANY ($2)
        AND q.exam_id = $3
        AND s.student_school_id IS NULL`, 
      [studentId, questionType_Obj, examId]);

      for (const row of unansweredQuestions_Obj.rows) {
        await db.query(`
          INSERT INTO student_answers (student_school_id, exam_id, question_id, student_answer, is_correct) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
          [studentId, examId, row.question_id, ' ', false]);
      }
//=======
//+++++++ subjective questions
    const unansweredQuestions_Ess =  await db.query(`
      SELECT q.question_id, e.student_answer
      FROM questions q LEFT JOIN essay_answers e
        ON q.question_id = e.question_id
        AND e.student_school_id = $1
      WHERE q.question_type = $2
        AND q.exam_id = $3
        AND e.student_school_id IS NULL`, 
      [studentId, 'essay', examId]);

      for (const row of unansweredQuestions_Ess.rows) {
        await db.query(`
          INSERT INTO essay_answers (student_school_id, exam_id, question_id, student_answer, essay_score) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
          [studentId, examId, row.question_id, ' ', 0]);
      }
//+++++++
    const isSubmitted = await db.query(`
      SELECT is_submitted FROM student_scores
      WHERE exam_id = $1 AND student_school_id = $2`, 
      [examId, studentId]);

    if (isSubmitted.rows[0]?.is_submitted) {
      return res.status(400).json({ error: 'Already submitted' });
    }
    await db.query(
      `UPDATE student_scores
       SET is_submitted = true
       WHERE exam_id = $1 AND student_school_id = $2`,
      [examId, studentId]
    );
    
    res.status(200).json({ message: 'Exam marked as submitted' });
  } catch (error) {
    console.error('Error submitting student exam', error);
    res.status(500).json({ error: 'Failed to mark exam as submitted' });
  }
};