import express from "express";
import bcrypt from 'bcryptjs';
import {db} from '../db.js';
import { generateOTP, verifyOTP } from "./generateOTP.js";
import { sendUserEmail } from "./nodemailer.js";
import redisClient from "./redisClient.js";

import passport from "passport";
import { Strategy } from "passport-local";

const studentAuthRoutes = express.Router();
const saltRounds = 5;

studentAuthRoutes.post ('/register-request', async(req, res) => {
  //needed
  const {username, password, firstName, lastName} = req.body;
  const schoolId = username
  const email = `${schoolId}@pampangastateu.edu.ph`;
  //optional
  const {userGender, college} = req.body;
  
  if (!schoolId) return res.status(400).json({ message: 'Missing school ID' });

  if (!/^\d+$/.test(schoolId)) return res.status(400).json({ message: "Invalid username. Teachers cannot use this route." }); //only numbers allowed

  try {
    //check email if used or not
    const checkEmail = await db.query (`SELECT  * FROM users WHERE email = $1`, [email]);

    //check school_id if used or not
    const checkSchoolId = await db.query (`SELECT  * FROM users WHERE school_id = $1`, [schoolId]);

    if (checkEmail.rows.length > 0) return res.status(200).json({message: 'Email is already used. Proceed to Log-In'})

    if (checkSchoolId.rows.length > 0) return res.status(200).json({message: 'School ID already used.'})
    
    //password hashing uwu
    const hash = await bcrypt.hash(password, saltRounds) ;

    //generate OTP and send email
    const otp = await generateOTP(email); //wait for redis to store this
    await sendUserEmail({ email, token: otp }); //nodemailer

    //temporarily store user info in Redis (optional,, to auto-insert after verify)
    await redisClient.setEx(`pendingUser:${email}`, 300, JSON.stringify({ hash, firstName, lastName, userGender, college, schoolId }));

    return res.status(200).json({ message: 'OTP sent. Verify to complete registration.' });
  } catch (error) {
    console.error('Error Registering', error);
    res.status(500).json({ error: 'Failed to register' });
  }
});




studentAuthRoutes.post('/register-verify', async (req, res) => {
  const { code, schoolId } = req.body;
  //code from input ni user so we can compare sa generateOTP.js
  if (!schoolId || !code) return res.status(400).json({ message: 'Missing school ID or code' });

  const email = `${schoolId}@pampangastateu.edu.ph`;
  if (!email) return res.status(400).json({ message: 'Invalid or expired code' });
  try {
    const isValid = await verifyOTP(email, code); //send to generateOTP.js
            console.log(`isValid: ${isValid}`)
    if (!isValid) return res.status(400).json({ message: 'Invalid or expired code' });

    const userDataRaw = await redisClient.get(`pendingUser:${email}`);
    if (!userDataRaw) return res.status(400).json({ message: 'No pending registration found' });

    const { hash, firstName, lastName, userGender, college, schoolId } = JSON.parse(userDataRaw);

    //registering details to database
    await db.query(`
      INSERT INTO users (email, password, first_name, last_name, school_id, gender, college, role ) VALUES ($1, $2, $3 ,$4 ,$5 ,$6 ,$7, $8) RETURNING *
    `, [email, hash, firstName, lastName, schoolId, userGender, college, 'student']); //changed password to hash (hashed password)

    await redisClient.del(`pendingUser:${email}`); //delete temporary user info

    return res.status(201).json({ message: "Registered successfully. Try logging in" });
  } catch (err) {
    console.error('OTP Verification Error:', err);
    return res.status(500).json({ message: 'Server error during verification' });
  }
});



//passport
/* 
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
*/


export default studentAuthRoutes;
