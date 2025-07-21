import express from "express";
import bcrypt from 'bcryptjs';
import { Strategy } from "passport-local";
import {db} from './db.js';
import passport from "passport";

const authRoutes = express.Router();

const saltRounds = 5;

authRoutes.post ('/register', async(req, res) => {
  //needed
  const {email, password, firstName, lastName, schoolId} = req.body;
  //optional
  const {userGender, college} = req.body;

  try {
    //check email if used or not
    const checkEmail = await db.query (`
      SELECT  * FROM users
      WHERE email = $1`, [email]);

    //check school_id if used or not
    const checkSchoolId = await db.query (`
      SELECT  * FROM users
      WHERE school_id = $1`, [schoolId]);

    if (checkEmail.rows.length > 0) {
      return res.status(200).json({message: 'Email is already used. Proceed to Log-In'})
    } 
    if (checkSchoolId.rows.length > 0) {
      return res.status(200).json({message: 'School ID already used.'})
    } 
    
  //password hashing uwu
    const hash = await bcrypt.hash(password, saltRounds) ;

    //registering details to database
    await db.query(`
      INSERT INTO users (email, password, first_name, last_name, school_id, gender, college ) VALUES ($1, $2, $3 ,$4 ,$5 ,$6 ,$7) RETURNING *
    `, [email, hash, firstName, lastName, schoolId, userGender, college]); //changed password to hash (hashed password)

    return res.status(201).json({ message: "Registered successfully. Try logging in" });
  } catch (error) {
    console.error('Error Registering', error);
    res.status(500).json({ error: 'Failed to register' });
  }
});

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) { //login failed
      return res.status(401).json({ message: info?.error || "Login failed" });
    } 

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

passport.use(
  new Strategy({ usernameField: 'email' }, async function verify(email, password, cb) {
    //no need to req.body email and inputPassword. passport automates it

    try {
      const checkLogin = await db.query(`
      SELECT * FROM users
      WHERE email = $1`, [email]);

      if (checkLogin.rows.length === 0) {
        return cb(null, false, { error: 'This email is not associated with an account. Please register to continue.' });
      }

      const user = checkLogin.rows[0];
      
      const passwordMatch = await bcrypt.compare(password, user.password ) //true or false

      if (!password || !user.password) {
        return cb(null, false, { error: 'Missing credentials. Please fill in the missing fields.' });
      }
      if (!passwordMatch) { //if false (password did not match)
        return cb(null, false, {error: `Incorrect Password`})
      }

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
    // cb(null, user) → pass authentication
    // cb(null, false, { message }) → fail authentication
    // cb(error) → if an error occurred
  }
));

passport.serializeUser((user, cb) => { //runs after successful login
  cb(null, user)
})

passport.deserializeUser((user, cb) => { 
  cb(null, user)
})



export default authRoutes;
