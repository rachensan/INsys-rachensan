import {db} from '../../db.js'

export const createUser = async(req, res) => {
  const { fullName, email, role, password, schoolId } = req.body; //from postman testing

  try{
    const result = await db.query('INSERT INTO users (full_name, email, password, role, school_id) VALUES ($1, $2, $3, $4, $5)', [fullName, email, password, role, schoolId]
    );
    res.status(201).json(result.rows[0]);
  } catch(error) {
    console.error('Error INSERTING user', error);
    res.status(500).json({error: error.detail || 'Failed to CREATE user'});
  }
};