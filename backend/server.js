import express from "express";
import cors from "cors";

//userCONTROLLERS
  import { createUser, getUserById } from "./controllers/userControllers.js"
//examCONTROLLERS
  import { getAllExams, createExam, getExamById, getExamsByTitle, getExamsByStatus, updateExamStatus, updateExamTimer, deleteExam, updateExamDetails } from "./controllers/examControllers.js";
//questionCONTROLLERS
  import { createQuestion, deleteQuestionById, getQuestionsByExamId } from "./controllers/questionControllers.js";

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
  app.get('/api/users/:id', getUserById);
  app.post('/api/users', createUser);


// ========== EXAM ROUTES ==========
  app.get('/api/exams/search', getExamsByTitle); 
      //for searchbar title search
  app.get('/api/exams/status', getExamsByStatus);
  app.get('/api/exams/:examId', getExamById); 
      //fetch a single exam's details 
      //teachers (to view or edit a specific exam) 
      //students (to display exam info before starting)
  app.get('/api/exams', getAllExams);

  app.post('/api/exams', createExam);
  app.patch('/api/exams/:examId/status', updateExamStatus);
  app.patch('/api/exams/:examId/timer', updateExamTimer);
  app.patch('/api/exams/:examId/details', updateExamDetails);

  app.delete('/api/exams/:examId', deleteExam);
    //singular... one exam deletion

// ========== QUESTION ROUTES ==========
  app.post('/api/questions', createQuestion);
  app.get('/api/exams/:examId/questions', getQuestionsByExamId);
  app.delete('/api/exams/:examId/questions/:questionId', deleteQuestionById);


app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})


const routeNotes = [
  {
    
  }
]