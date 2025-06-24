export const examList = [
  {
    id: 1,
    title: "Midterm Exam",
    schedule: "June 20, 2025 at 2:00PM",
    status: "ongoing",
    sections: [],
    questions: [
      {
        id: 1,
        questionType: "multiplechoice",
        question: "multiple choice question here",
        correctAnswer: "Choice A",
        options: ["Choice Ampota", "Choice Bonak", "Choice Chihuahua"],
      },
      {
        id: 2,
        questionType: "truefalse",
        question: "true or false question here",
        correctAnswer: 'True',
      },
      {
        id: 3,
        questionType: "identification",
        question: "identification question here",
        correctAnswer: "okay beh"
      }
    ]
  },
]

//GET
export const viewAllExam = (req, res) => { //viewing list in home page
  res.json(examList);
}

export const getExamById = (req, res) => {
  const id = parseInt(req.params.id)
  const exam = examList.find(e=>e.id === id)

  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' });
  }

  res.json({
    id: exam.id,
    title: exam.title,
    schedule: exam.schedule,
    status: exam.status,
    sections: exam.sections,
    questions: exam.questions,
  });
}


//POST
export const createExam = (req, res) => {
  const { title, schedule, status, sections, subjCode } = req.body //not a new declaration, kinukuha lang natin yung {title, status, schedule} sa front end

  const newExam = {
    id: Date.now(), //TEMPORARY SO THAT IT IS ✨UNIQUE✨ FOR NOW. LOL
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