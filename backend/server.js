import express from "express";
import cors from "cors";

import { viewAllExam, createExam, updateExam ,getExamById, deleteExam } from "./A-controllers/examControllers.js";
import { viewAllQuestions, getQuestionsPerExamId, createQuestion } from "./A-controllers/questionControllers.js";

const app = express();
const port = process.env.PORT || 3000; // we dint have env yet

app.use(cors()); // allow frontend to access backend
app.use(express.json()); // parse JSON bodies

//routes
//GET
app.get('/api/exams', viewAllExam);
app.get('/api/exams/:id', getExamById);

app.get('/api/exams/AllQuestions', viewAllQuestions); //only for viewing/checking if its working
app.get('/api/exams/:id/questions', getQuestionsPerExamId)




//POST
app.post('/api/exams', createExam);
app.post('/api/exams/:id/questions', createQuestion);



//PUT
app.put('/api/exams/:id', updateExam);

//DELETE
app.delete('/api/exams/:id', deleteExam)








app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})
