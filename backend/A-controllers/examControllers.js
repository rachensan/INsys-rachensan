
export const getAllExams = (req, res) => {
  var timeNow = new Date().getSeconds();
  const exams = [
    { id: 1, title: "Prelim Exam", schedule: timeNow},
    { id: 2, title: "Midterm Exam", schedule: timeNow}
  ];
  res.json(exams);
};

export const createExam = (req, res) => {
  const { title, schedule } = req.body;

  if ( !title || !schedule ) {
    return res.status(400).json({ message: "Title and schedule are required." })
  };

  const newExam = {
    id: Math.floor(Math.random() * 10), //temporary generator
    title,
    schedule,
  };

  res.status(201).json(newExam)
};