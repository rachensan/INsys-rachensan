import express from "express";
import { getAllExams, addExam } from "../controllers/examControllers.js";

const router = express.Router();

router.get("/", getAllExams);
router.post("/", addExam);

export default router;
