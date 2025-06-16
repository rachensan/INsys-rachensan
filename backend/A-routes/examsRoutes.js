import express from "express";
import { getAllExams } from "../A-controllers/examControllers.js"

const examRouter = express.Router();

examRouter.get("/exams", getAllExams);

export default examRouter;