//not yet finalized, 
//in the future you add: DELETE course, ADD course
//recheck the addSection ( const { courseId } = req.body; ). what if the id is deleted or no longer existing? do not depend solely on courseId

import {db} from '../db.js';


export const courseData = async(req, res) => {
  try {
    const result = await db.query(`SELECT * FROM courses`); //BSIT, BSCS, BSIS
      
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting course data', error);
    res.status(500).json({ error: 'Failed to course data' });
  }
}

export const yearLevelData = async(req, res) => {
  try {
    const result = await db.query(` SELECT * FROM year_levels `); //"1", "2", "3", "4"
      
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting year level data', error);
    res.status(500).json({ error: 'Failed to year level data' });
  }
}


export const yearSection = async(req, res) => {
  try {
    const result = await db.query(`
      SELECT s.section_id, c.course_id, c.course_code, y.year_number, s.section_name
      FROM sections s
      JOIN courses c ON s.course_id = c.course_id
      JOIN year_levels y ON s.year_level_id = y.year_level_id
      ORDER BY c.course_code, y.year_number, s.section_name `); //BSCS, 3, A
      
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting section/year data', error);
    res.status(500).json({ error: 'Failed to fetch section/year data' });
  }
}

//ADD SECTION
export const addSection = async (req, res) => { //admin
  const { courseId, yearLevelId, sectionName } = req.body; 
    //in frontend get course name with value of courseId

  const checkExisting = await db.query(`SELECT course_id FROM courses`);
  const courseIdsDB = checkExisting.map(check => check.course_id);

  if (!courseIdsDB.includes(courseId)) {
    return res.status(400).json({ error: 'Course does not exist' });
  }

  try {
    const result = await db.query(
      `INSERT INTO sections (course_id, year_level_id, section_name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [courseId, yearLevelId, sectionName]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding section:', error);
    res.status(500).json({ error: 'Failed to add section' });
  }
};

//DELETE SECTION
export const deleteSection = async (req, res) => { //admin
  const { sectionId } = req.params;

  try {
    await db.query(
      `DELETE FROM sections WHERE section_id = $1`
      , [sectionId]
    );

    res.status(200).json({ message: 'Section deleted' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ error: 'Failed to delete section' });
  }
};

