import express from "express";
import cors from "cors";

import { createUser } from "./controllers/userControllers.js"
import { getAllExams, createExam } from "./controllers/examControllers.js";
import { createQuestion } from "./controllers/questionControllers.js";

/*

import { viewAllExam, createExam, updateExam ,getExamById, deleteExam } from "./controllers/examControllers.js";
import { viewAllQuestions, getQuestionsPerExamId, createQuestion } from "./controllers/questionControllers.js";
import { createUser } from "./controllers/userControllers.js"

*/

const app = express();
const port = process.env.PORT || 3000; // we dint have env yet

app.use(cors()); // allow frontend to access backend
app.use(express.json()); // parse JSON bodies

// ========== TEST IF BACKEND WORKING ==========
  app.get('/', (req, res) => res.send('Backend is running UwU!'));


// ========== USER ROUTES ==========

  app.post('/api/users', createUser);


// ========== EXAM ROUTES ==========
  app.get('/api/exams', getAllExams);
  app.post('/api/exams', createExam);

// ========== QUESTION ROUTES ==========
  app.post('/api/questions', createQuestion);



/* 

// ========== EXAM ROUTES ==========

// GET all exams
  app.get('/api/exams', viewAllExam);

// GET exam by ID
  app.get('/api/exams/:id', getExamById);

// CREATE a new exam
  app.post('/api/exams', createExam);

// UPDATE an existing exam
  app.put('/api/exams/:id', updateExam);

// DELETE an exam
  app.delete('/api/exams/:id', deleteExam);




// ========== QUESTION ROUTES ==========

// GET all questions (for checking/testing purposes)
  app.get('/api/exams/AllQuestions', viewAllQuestions);

// GET questions by exam ID
  app.get('/api/exams/:id/questions', getQuestionsPerExamId);

// CREATE a question under a specific exam
  app.post('/api/exams/:id/questions', createQuestion);


*/


app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})
