import express from "express";
import bcrypt from 'bcryptjs';
import {db} from '../db.js';

const authRoutes = express.Router();

authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email && !password) return res.status(400).json({ error: 'Missing credentials. Please fill all the missing field' });

  if (!email || !password) {
    const missingField = !email ? 'email' : 'password';
    return res.status(400).json({ error: `Please enter your ${missingField}.` });
  }

  try {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'This email is not associated with an account. Please register to continue.' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password ) //true or false

    if (!passwordMatch) { //if false (password did not match)
      return res.status(401).json({error: `Incorrect Password`})
    }
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error('Error Logging In', error);
    res.status(500).json({ error: 'Failed to Log in' });
  }
  
});

export default authRoutes;