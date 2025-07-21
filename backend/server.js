import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env', quiet: true });

import session from "express-session";
import passport from "passport";

import authRoutes from "./auth.js";

const app = express();
const port = process.env.PORT || 3000; // we dint have env yet

//prep frontend:
app.use(cors()); // allow frontend to access backend
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); 

//authentication
app.use(
  session({
    secret: 'TOPSECRET-UWU',
    resave: false, 
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//authentication
app.use('/api', authRoutes);


//verify student
  import { verifyExamAccess, answerSubmission, autoScoringTemplate, manualEssayScoring, getInfoPerExam, getStudentExamHistory, autoSubmitAllAnswers } from "./controllers/studentQuery.js";

//userCONTROLLERS
  //GET
    import { getUserById } from './controllers/userControllers/GET.js'
  //POST
    import { createUser } from './controllers/userControllers/POST.js'
  //UPDATE
    import {  } from './controllers/userControllers/UPDATE.js'
  //DELETE
    import {  } from "./controllers/userControllers/DELETE.js";


//examCONTROLLERS
  //GET
    import { getAllExams, getExamById, getExamsByTitle, getExamsByStatus, getExamCode, getSectionTakersByExamId, getAllScoresByExam, getEssayPerStudent, getExamSchedule, getSectionSchedule } from './controllers/examControllers/GET.js'
  //POST
    import { createExam } from './controllers/examControllers/POST.js'
  //UPDATE
    import { updateExamDetails, updateExamCode, updateExamStatus, updateExamTimer, updateSectionTakers, finalizeExamSchedule } from './controllers/examControllers/UPDATE.js'
  //DELETE
    import { deleteExam } from "./controllers/examControllers/DELETE.js";


//questionCONTROLLERS
  //GET
    import { getQuestionsByExamId } from './controllers/questionControllers/GET.js'
  //POST
    import { createQuestion } from './controllers/questionControllers/POST.js'
  //UPDATE
    import {  } from './controllers/questionControllers/UPDATE.js'
  //DELETE
    import { deleteQuestionById } from "./controllers/questionControllers/DELETE.js";




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
  app.get('/api/exams/:examId/essays/:studentSchoolId', getEssayPerStudent);
  app.get('/api/exams/:examId/code', getExamCode);
      //or destructure the getExamById in frontend like:
      //const [exam, setExam] = useState(null);
      //useEffect(() => {
      //  axios.get(`/api/exams/${examId}`)
      //    .then(res => setExam(res.data));
      //}, []);
      //<p>Exam Code: {exam?.exam_code}</p>
  app.get('/api/exams/:examId/sections', getSectionTakersByExamId);
  app.get('/api/exams/:examId/scores/:sectionTaker', getAllScoresByExam);
  app.post('/api/exams', createExam);

  app.put('/api/exams/:examId/sections', updateSectionTakers);
      //can be null at first, when published without sections, will show popup alert... imma fix it later, im sleepy

  app.patch('/api/exams/:examId/status', updateExamStatus);
  app.patch('/api/exams/:examId/timer', updateExamTimer);
  app.patch('/api/exams/:examId/details', updateExamDetails);
  app.patch('/api/exams/:examId/code', updateExamCode);
      //not really needed, cuz we create the exam code at exam creation
  app.get('/api/exams/:examId/schedule', getExamSchedule);
  app.put('/api/exams/:examId/schedule', finalizeExamSchedule);

  app.delete('/api/exams/:examId', deleteExam);
    //singular... one exam deletion

// ========== QUESTION ROUTES ==========
  app.post('/api/questions', createQuestion);
  app.get('/api/exams/:examId/questions', getQuestionsByExamId);
  app.delete('/api/exams/:examId/questions/:questionId', deleteQuestionById);


// ========== STUDENT ROUTES ==========
  app.get('/api/student/:studentId/exams/:examId/info', getInfoPerExam);
  app.get('/api/student/:studentId/exam-history', getStudentExamHistory);
  app.get('/api/exams/:examId/section-schedule', getSectionSchedule);

  app.post('/api/student/:studentId/exams/:examId/auto-submit', autoSubmitAllAnswers);
  app.post('/api/student/verify', verifyExamAccess);
  app.post('/api/student-answers/submit', answerSubmission); 
      //autoScoringLogic works here
  app.put('/api/student-scores/score', autoScoringTemplate); 
      //backup tool
      //admin suspects incorrect scoring
      //wants to force re-check

  

// ========== TEACHER ROUTES ==========
  app.patch('/api/student-score/essay/:examId/:questionId', manualEssayScoring);
   
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})
