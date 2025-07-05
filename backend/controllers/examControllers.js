import examList from "./data/examList.js";
import {db} from '../db.js';
//create exams, lists exams

export const getAllExams = async(req, res) =>{

  try {
    const result = await db.query('SELECT * FROM examination_data')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error cant GET exams', error)
  }

} 

export const createExam = async(req, res) => {
  const { title, schedule, status } = req.body //add section_taker and subj code next time
  try {
    const result = await db.query('INSERT INTO examination_data (title, schedule, status) VALUES($1, $2, $3)', [title, schedule, status]
    );
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error cant CREATE exams', error)
    res.status(500).json({error: 'Failed to CREATE exam'});
  }
}

export const getExamById = async(req, res) => {
  const examId = req.params.id;
  try {
    const result = await db.query("SELECT * FROM examination_data WHERE exam_id = $1", [examId]
    );
    res.status(200).json(result.rows[0]);
    
  } catch (error) {
    console.error('Error cant GET exam', error)
    res.status(500).json({error: 'Failed to GET exam'});
  }
}

/* 

export const getExamById = (req, res) => {
  const id = parseInt(req.params.id)

  const exam = examList.find(e=>e.id === id)

  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' });
  }

  console.log("examList in this file:", examList);
  console.log("Exam object found:", exam);
  console.log("Questions inside exam:", exam.questions);
  console.log("Reference check:", examList === globalThis.examList); 


  res.json({
    id: exam.id,
    title: exam.title,
    schedule: exam.schedule,
    status: exam.status,
    sections: exam.sections,
    questions: exam.questions,
  });
}


*/







// //POST
// export const createExam = (req, res) => {
//   const { title, schedule, status, sections, subjCode } = req.body //not a new declaration, kinukuha lang natin sa front end (HomeCard())

//   const newExam = {
//     id: Date.now(), //TEMPORARY SO THAT IT IS ✨UNIQUE✨ FOR NOW. LOL
//     title,
//     schedule,
//     status,
//     sections,
//     subjCode,
//   }
//   examList.push(newExam); //this is a temporary array before our db
//   res.status(200).json(newExam);
// }








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