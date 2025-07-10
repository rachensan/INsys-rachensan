import {db} from '../../db.js'

export const createUser = async(req, res) => {
  const { full_name, email, role, password } = req.body; //from postman testing

  try{
    const result = await db.query('INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4)', [full_name, email, password, role]
    );
    res.status(201).json(result.rows[0]);
  } catch(error) {
    console.error('Error INSERTING user', error);
    res.status(500).json({error: 'Failed to CREATE user'});
  }
};