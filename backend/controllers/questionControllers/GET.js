import {db} from '../../db.js';

export const getQuestionsForStudent = async(req, res) => { 
  //not used yet,, if you want to use, update it first and add some functions like the getUnansweredQuestions

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
//this one s pure chatgpt because im not familiar with this advance db prompt,,, and im sleepy...
export const getUnansweredQuestions = async(req, res) => {
  const {examId} = req.params;
  const studentId = req.user.schoolId;

  //shuffle helper inside
  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }
    return array;
  };

  try {
    // 1. Get active session
    let sessionRes = await db.query(`
      SELECT session_id, question_order
      FROM exam_sessions
      WHERE exam_id = $1 AND student_school_id = $2 AND status = 'in-progress'
      LIMIT 1
    `, [examId, studentId]);

    let sessionId, questionOrder;

    if (sessionRes.rows.length === 0) {
      // no session → create one
      const questionsRes = await db.query(`
        SELECT question_id, question_type
        FROM questions
        WHERE exam_id = $1
      `, [examId]);

      const objectives = questionsRes.rows.filter(q => q.question_type !== 'essay');
      const essays = questionsRes.rows.filter(q => q.question_type === 'essay');

      const shuffledObjectives = shuffle(objectives); // use your frontend shuffle function
      questionOrder = [...shuffledObjectives.map(q => q.question_id), ...essays.map(q => q.question_id)];

      const insertRes = await db.query(`
        INSERT INTO exam_sessions (exam_id, student_school_id, question_order)
        VALUES ($1, $2, $3)
        RETURNING session_id
      `, [examId, studentId, JSON.stringify(questionOrder)]);

      sessionId = insertRes.rows[0].session_id;
    } else {
      // session exists
      sessionId = sessionRes.rows[0].session_id;
      questionOrder = sessionRes.rows[0].question_order;

      // if question_order is null, initialize it
      if (!questionOrder || questionOrder.length === 0) {
        const questionsRes = await db.query(`
          SELECT question_id, question_type
          FROM questions
          WHERE exam_id = $1
        `, [examId]);

        const objectives = questionsRes.rows.filter(q => q.question_type !== 'essay');
        const essays = questionsRes.rows.filter(q => q.question_type === 'essay');

        const shuffledObjectives = shuffle(objectives);
        questionOrder = [...shuffledObjectives.map(q => q.question_id), ...essays.map(q => q.question_id)];

        await db.query(`
          UPDATE exam_sessions
          SET question_order = $1
          WHERE session_id = $2
        `, [JSON.stringify(questionOrder), sessionId]);
      }
    }

    // 2. Get unanswered questions
    const result = await db.query(`
      WITH ordered AS (
        SELECT (elem.value)::int AS question_id, elem.ordinality AS ord
        FROM jsonb_array_elements_text($1::jsonb) WITH ORDINALITY elem
      )
      SELECT q.question_id, q.question_text, q.question_type,
             q.option_a, q.option_b, q.option_c, q.option_d, q.points, o.ord
      FROM ordered o
      JOIN questions q ON q.question_id = o.question_id
      LEFT JOIN student_answers sa
        ON sa.question_id = q.question_id
        AND sa.exam_id = $2
        AND sa.student_school_id = $3
      LEFT JOIN essay_answers ea
        ON ea.question_id = q.question_id
        AND ea.student_school_id = $3
      WHERE sa.question_id IS NULL
        AND ea.question_id IS NULL
      ORDER BY o.ord
    `, [JSON.stringify(questionOrder), examId, studentId]);

    const objectives = result.rows.filter(q => q.question_type !== 'essay');
    const essays = result.rows.filter(q => q.question_type === 'essay');

    res.status(200).json({ objectives, essays });
  } catch (error) {
    console.error('Error cant GET unanswered questions', error)
    res.status(500).json({error: 'Failed to GET unanswered questions'});
  }
}