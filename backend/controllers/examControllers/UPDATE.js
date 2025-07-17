import {db} from '../../db.js';

export const updateSectionTakers = async (req, res) => {
  const { examId } = req.params;
  const { sections } = req.body;

  if (!Array.isArray(sections)) {
    return res.status(400).json({ message: 'Invalid section data' });
  }

  try {
    await db.query('BEGIN');

    // 1. Delete existing sections
    await db.query("DELETE FROM section_takers WHERE exam_id = $1", [examId]);

    // 2. Insert new sections
    const insertPromises = sections.map(section =>
      db.query("INSERT INTO section_takers (exam_id, section_name) VALUES ($1, $2)", [examId, section])
    );

    await Promise.all(insertPromises);
    await db.query('COMMIT');

    res.status(200).json({ message: 'Sections updated successfully' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error updating sections:', error);
    res.status(500).json({ error: 'Failed to update sections' });
  } finally {
    client.release();
  }
};

export const updateExamStatus = async(req, res) => {
  const { examId } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query("UPDATE examinations SET status = $1 WHERE exam_id = $2 RETURNING *", [status, examId]);

    if(result.rows.length === 0) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating exam status', error);
    res.status(500).json({ error: 'Failed to update exam status' });
  }
}

export const updateExamTimer = async(req, res) => {
  const { examId } = req.params;
  const { timer } = req.body;

  try {
    const result = await db.query ("UPDATE examinations SET timer = $1 WHERE exam_id = $2 RETURNING *", [timer, examId]);

    if(result.rows.length === 0) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating exam timer', error);
    res.status(500).json({ error: 'Failed to update exam timer' });
  }
}

export const updateExamDetails = async(req, res) => {
  const { examId } = req.params;
  const { title, schedule, timer, status } = req.body;

  try {
    const fields = [];
    const values = [];
    let count = 1;

    if (title) { //if exists = edited/patch
      fields.push(`title = $${count++}`); //count=1 will increment +1 === $2
      values.push(title);
    }
    if (schedule) {
      fields.push(`schedule = $${count++}`); // $3
      values.push(schedule);
    }
    if (status) {
      fields.push(`status = $${count++}`); // $4
      values.push(status);
    }
    if (timer) {
      fields.push(`timer = $${count++}`); // $4
      values.push(timer);
    }
    

    if (fields.length === 0) {
      return res.status(400).json({ message: "No data to update" });
    }

    values.push(examId);
      // we start at count = 1 because SQL placeholders start at $1 (not $0)
      
      //fields = ["title = $1", "schedule = $2", "timer = $3"]
      
    const query = `UPDATE examinations SET ${fields.join(", ")} WHERE exam_id = $${count} RETURNING *`;

      //query = $1 $2 $3 $4 
            //fields have $1,$2,$3
            //exam_id have $4
      //values = [title, schedule, timer, examId]

    const result = await db.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating exam details", error);
    res.status(500).json({ error: "Failed to update exam details" });
  }
}

export const updateExamCode = async(req, res) => {
  const { examId } = req.params;
  const randomExamCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    const result = await db.query("UPDATE examinations SET exam_code = $1 WHERE exam_id = $2 RETURNING *", [randomExamCode, examId]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No data to update" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating exam code", error);
    res.status(500).json({ error: "Failed to create exam code" });
  }
}

export const finalizeExamSchedule = async(req, res) => {
  const {examId} = req.params;
  const {scheduledDate, addTimerMinutes, sectionName} = req.body; 
        //scheduledDate here is a string... convert to date 

  const startExamDate = new Date(scheduledDate + "+08:00"); //start date
  const endExamDate = new Date(startExamDate); //cloning startDate and add the timer
        endExamDate.setMinutes(endExamDate.getMinutes() + addTimerMinutes);

  const dateNow = new Date();
  const shouldFinalize = dateNow >= endExamDate; //true or false

  try {
    const result = await db.query(`
      UPDATE section_takers s
      SET 
        start_datetime = $1, 
        timer_minutes = $2,
        end_datetime = $3
      WHERE 
        exam_id = $4
        AND section_name = $5
        RETURNING s.*`, 
      [startExamDate, addTimerMinutes, endExamDate, examId, sectionName]);


      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No matching section or exam found" });
      }

      await db.query(`
        UPDATE section_takers
        SET is_finalized = $1
        WHERE exam_id = $2
          AND section_name = $3`, [shouldFinalize, examId, sectionName])

      res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating finalized schedule", error);
    res.status(500).json({ error: "Failed to update finalized timer schedule???" });
  }
}