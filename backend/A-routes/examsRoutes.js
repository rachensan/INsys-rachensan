import express from "express";
import { getAllExams, createExam } from "../A-controllers/examControllers.js"

const examRouter = express.Router();

examRouter.get("/exams", getAllExams);
examRouter.post("/exams", createExam);

export default examRouter;