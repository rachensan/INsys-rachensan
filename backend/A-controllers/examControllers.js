let exams = []; // temporary in-memory data 
//replace later with Postgres

export const getAllExams = (req, res) => {
  res.json(exams);
};

export const addExam = (req, res) => {
  const newExam = req.body;
  exams.push(newExam);
  res.status(201).json({ message: "Exam added", newExam });
};
