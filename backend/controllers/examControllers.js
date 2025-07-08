import examList from "./data/examList.js";
import {db} from '../db.js';
//create exams, lists exams

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




/*
//THIS IS THE BS I DID WITHOUT THE DATABASE, I TORTURED MYSELF

export const updateExam = (req, res) => {
  const id = parseInt(req.params.id)
  const searchIndex = examList.findIndex(e=>e.id === id)

  if (searchIndex === -1) {
    return res.status(404).json({ message: "Exam not found" });
  }

  examList[searchIndex] = {
      ...examList[searchIndex], // ✔️ existing exam object at that index na iooverwrite ni '...exam'
      ...req.body,            // ✔️ updated values from frontend
  }

  res.status(200).json(examList[searchIndex])
}


//DELETE
export const deleteExam = (req, res) => {
  const id = parseInt(req.params.id)
  const searchIndex = examList.findIndex(e=>e.id===id)

  if (searchIndex>-1) {
    const deletedExam = examList.splice(searchIndex, 1) //remove 1 item starting at searchIndex(id we are looking for)
    res.status(200).json({message: `Exam: '${deletedExam[0].title}' deleted successfully`}); //[0] the first exam object we removed
  } else {
    res.status(404).json({err:`Exam with ID ${id} not found. No exams were deleted`})
  }
}
*/