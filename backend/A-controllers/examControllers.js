export const examList = [
  {
    id: 1,
    title: "Midterm Exam",
    schedule: "June 20, 2025 at 2:00PM",
    status: "ongoing",
  },
  {
    id: 2,
    title: "Final Exam",
    schedule: "July 5, 2025 at 1:00PM",
    status: "ongoing",
  },
  {
    id: 3,
    title: "Quiz #1",
    schedule: "June 18, 2025 at 10:00AM",
    status: "done",
  },
  {
    id: 4,
    title: "Activity #5",
    schedule: "June 20, 2025 at 10:00AM",
    status: "ongoing",
  },
]

export const viewAllExam = (req, res) => {
  res.json(examList);
}

export const getExamById = (req, res) => {
  const {id} = req.params
  const exam = examList.find(e=>e.id===Number(id))

  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' });
  }

  res.json(exam);
}

export const createExam = (req, res) => {
  const { title, subjCode, schedule, status } = req.body //not a new declaration, kinukuha lang natin yung {title, status, schedule} sa front end

  const newExam = {
    id: examList.length+1,
    title,
    schedule,
    status,
    subjCode,
  }
  examList.push(newExam);
  res.status(200).json(newExam);
}

export const updateExam = (req, res) => {
  const {id} = req.params
  const index = examList.findIndex(e=>e.id===Number(id))

  if(index !== -1) {
    examList[index] = {
      ...examList[index], // ✔️ existing exam object at that index na iooverwrite ni '...exam'
      ...exam,            // ✔️ updated values from frontend
    }
  }
  
  res.status(200).json(examList[index])
}