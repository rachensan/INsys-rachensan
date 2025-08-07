import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env', quiet: true });

//AUTH 
import session from "express-session";
import cookieParser from 'cookie-parser';
import teacherAuthRoutes from "./utils/teacherAuth.js";
import studentAuthRoutes from "./utils/studentAuth.js";
import authRoutes from "./utils/auth.js";
import { verifyJWT, verifyRole, refreshAccessToken, clearToken } from "./utils/jwt.js";

const app = express();
const port = process.env.PORT || 3000;

// import passport from "passport";
// app.use(passport.initialize());
// app.use(passport.session());

app.use(cookieParser());

//prep frontend:
app.use(cors({ //allow frontend to access backend
  origin: `http://localhost:5173`, //React frontend
  credentials: true
}));

//authentication
app.use(
  session({
    secret: 'TOPSECRET-UWU',
    resave: false, 
    saveUninitialized: true,
  })
);

const teacherOnly = [verifyJWT, verifyRole('teacher')];
const studentOnly = [verifyJWT, verifyRole('student')];
const adminOnly = [verifyJWT, verifyRole('admin')];


//just for testing if jwt working
app.get('/api/protected', teacherOnly, (req, res) => {
  res.json({ message: "JWT is valid", user: req.user });
});

app.post("/api/refresh", refreshAccessToken);

  

 








app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); 

//authRouting
app.use('/api', authRoutes);
app.use('/api/student', studentAuthRoutes);
app.use('/api/teacher', teacherAuthRoutes);


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
    import { getAllExams, getExamById, getExamsByTitle, getExamsByStatus, getExamCode, getSectionTakersByExamId, getAllScoresByExam, getEssayPerStudent, getExamSchedule, getSectionSchedule, getAllQuestionsByExam } from './controllers/examControllers/GET.js'
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
    import { updateQuestion } from './controllers/questionControllers/UPDATE.js'
  //DELETE
    import { deleteQuestionById } from "./controllers/questionControllers/DELETE.js";

//year and section
  import { addSection, courseData, yearLevelData, deleteSection, yearSection } from "./controllers/yearSection.js";






// ========== TEST IF BACKEND WORKING ==========
  app.get('/', (req, res) => res.send('Backend is running UwU!'));


// ========== YEAR AND SECTION ROUTES ==========
  app.get('/api/sections/year-section', teacherOnly, yearSection);
  app.get('/api/course/details', teacherOnly, courseData); 
  app.get('/api/year-level/details', teacherOnly, yearLevelData); 


  app.post('/api/sections', adminOnly, addSection);
  app.delete('/api/sections/:sectionId', adminOnly, deleteSection);


// ========== USER ROUTES ==========
  app.get('/api/users/:id', teacherOnly, getUserById);
  app.post('/api/users', createUser);


// ========== EXAM ROUTES ==========
  app.get('/api/exams/:userId', teacherOnly, getAllExams);
  app.get('/api/exams/search', teacherOnly, getExamsByTitle); 
      //for searchbar title search
  app.get('/api/exams/status', teacherOnly, getExamsByStatus);
  app.get('/api/exams/questions/:examId', teacherOnly, getAllQuestionsByExam);
      //get all questions to a specific exam
  app.get('/api/exams/exam/:examId', teacherOnly, getExamById); 
      //fetch a single exam's details (not questions)
      //teachers (to view or edit a specific exam) 
      //students (to display exam info before starting)
      
  app.get('/api/exams/:examId/essays/:studentSchoolId', teacherOnly, getEssayPerStudent);
  app.get('/api/exams/:examId/code', teacherOnly, getExamCode);
      //or destructure the getExamById in frontend like:
      //const [exam, setExam] = useState(null);
      //useEffect(() => {
      //  axios.get(`/api/exams/${examId}`)
      //    .then(res => setExam(res.data));
      //}, []);
      //<p>Exam Code: {exam?.exam_code}</p>
  app.get('/api/exams/:examId/sections', teacherOnly, getSectionTakersByExamId);
  app.get('/api/exams/:examId/scores/:sectionTaker', teacherOnly, getAllScoresByExam);
  
  app.post('/api/exams/:userId', teacherOnly, createExam);

  app.put('/api/exams/:examId/sections', teacherOnly, updateSectionTakers);
      //can be null at first, when published without sections, will show popup alert... imma fix it later, im sleepy

  app.patch('/api/exams/:examId/status', teacherOnly, updateExamStatus);
  app.patch('/api/exams/:examId/timer', teacherOnly, updateExamTimer);
  app.patch('/api/exams/:examId/details', teacherOnly, updateExamDetails);
  app.patch('/api/exams/:examId/code', teacherOnly, updateExamCode);
      //not really needed, cuz we create the exam code at exam creation
  app.get('/api/exams/:examId/schedule', teacherOnly, getExamSchedule);
  app.put('/api/exams/:examId/schedule', teacherOnly, finalizeExamSchedule);

  app.delete('/api/exams/:examId', teacherOnly, deleteExam);
      //singular... one exam deletion

// ========== QUESTION ROUTES ==========
  app.post('/api/questions/:examId', teacherOnly, createQuestion);
  app.get('/api/exams/:examId/questions', teacherOnly, getQuestionsByExamId); //idk why i made this and what for, lol
  app.patch('/api/exams/:examId/questions/:questionId', teacherOnly, updateQuestion);
  
  app.delete('/api/exams/:examId/questions/:questionId', teacherOnly, deleteQuestionById);

// ========== STUDENT ROUTES ==========
  app.get('/api/student/:studentId/exams/:examId/info', studentOnly, getInfoPerExam);
  app.get('/api/student/:studentId/exam-history', studentOnly);
  app.get('/api/exams/:examId/section-schedule', studentOnly, getSectionSchedule);

  app.post('/api/student/:studentId/exams/:examId/auto-submit', studentOnly, autoSubmitAllAnswers);
  app.post('/api/student/verify', studentOnly, verifyExamAccess);
  app.post('/api/student-answers/submit', studentOnly, answerSubmission); 
      //autoScoringLogic works here
  app.put('/api/student-scores/score', autoScoringTemplate); 
      //backup tool
      //admin suspects incorrect scoring
      //wants to force re-check

  

// ========== TEACHER ROUTES ==========
  app.patch('/api/student-score/essay/:examId/:questionId', teacherOnly, manualEssayScoring);
   
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})
