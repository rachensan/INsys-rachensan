export const examList = [
  {
    id: 1,
    title: "Midterm Exam",
    schedule: "June 20, 2025 at 2:00PM",
    status: "ongoing",
    sections: []
  },
  {
    id: 2,
    title: "Final Exam",
    schedule: "July 5, 2025 at 1:00PM",
    status: "ongoing",
    sections: []
  },
  /*
  {
    id: 3,
    title: "Quiz #1",
    schedule: "June 18, 2025 at 10:00AM",
    status: "done",
    sections: []
  },
  {
    id: 4,
    title: "Activity #5",
    schedule: "June 20, 2025 at 10:00AM",
    status: "ongoing",
    sections: []
  }, 
  */
]


//GET
export const viewAllExam = (req, res) => {
  res.json(examList);
}

export const getExamById = (req, res) => {
  const id = parseInt(req.params.id)
  const exam = examList.find(e=>e.id === id)

  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' });
  }

  res.json(exam);
}


//POST
export const createExam = (req, res) => {
  const { title, schedule, status, sections, subjCode } = req.body //not a new declaration, kinukuha lang natin yung {title, status, schedule} sa front end

  const newExam = {
    id: Date.now(),
    title,
    schedule,
    status,
    sections,
    subjCode,
  }
  examList.push(newExam);
  res.status(200).json(newExam);
}


//PUT
export const updateExam = (req, res) => {
  const id = parseInt(req.params.id)
  const searchIndex = examList.findIndex(e=>e.id === id)

  if (searchIndex === -1) {
    return res.status(404).json({ message: "Exam not found" });
  }

  examList[searchIndex] = {
      ...examList[searchIndex], // ✔️ existing exam object at that index na iooverwrite ni '...exam'
      ...req.body,            // ✔️ updated values from frontend
  }

  res.status(200).json(examList[searchIndex])
}


//DELETE
export const deleteExam = (req, res) => {
  const id = parseInt(req.params.id)
  const searchIndex = examList.findIndex(e=>e.id===id)

  if (searchIndex>-1) {
    const deletedExam = examList.splice(searchIndex, 1) //remove 1 item starting at searchIndex(id we are looking for)
    res.status(200).json({message: `Exam: '${deletedExam[0].title}' deleted successfully`}); //[0] the first exam object we removed
  } else {
    res.status(404).json({err:`Exam with ID ${id} not found. No exams were deleted`})
  }
}