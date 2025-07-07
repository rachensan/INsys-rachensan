import {db} from '../db.js'
//register, login, get users

export const getUserById = async(req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({message: 'User not found'})
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error cant GET user', error)
    res.status(500).json({error: 'Failed to GET user'});
  }
}

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
