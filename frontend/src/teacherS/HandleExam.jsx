import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Title from "./handleExam/1-Title";
import SelectedSection from './handleExam/2-Section';

function HandleExam() {
  const navigate = useNavigate();
  const {id} = useParams();

  //THESE: exam, setExam ARE THE ENTIRE EXAM OBJECT
  const [examData, setExamData] = useState({
    title: '',
    schedule: '',
    status: 'pending',
    sections: [],
  })

  
  const defaultExamNotChanging = {
    title: '',
    schedule: '',
    status: 'pending',
    sections: [],
  } //for resetting the form, etc.

  const [selectedSections, setSelectedSections] = useState([]);

  //useEffect will work IF there is an existing id
  useEffect(()=>{
    if(id) {
      axios.get(`http://localhost:3000/api/exams/${id}`)
        .then(res => {setExamData(res.data)})
        .catch(err=>{console.error(err)})
    }
  }, [id])  
  //it will be skipped, if no id seen, it will create a new one

  



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data being sent:", {
      ...examData,
      sections: selectedSections
    });


    if (id) { //if existing: EDIT mode
      axios.put(`http://localhost:3000/api/exams/${id}`, examData)
        .then(res=>console.log('exam updated'))
        .catch(err=>console.error(err))
    } 
    else { //if NOT existing: CREATE-NEW mode
      const newExam = { ...examData, sections: selectedSections}
      axios.post('http://localhost:3000/api/exams', newExam)
        .then(res=> {
          setExamData({ ...defaultExamNotChanging}); //auto reset form for future creations
          setSelectedSections([]); // clear the checkboxes
          navigate('/');
        })
        .catch(err=> console.log(err))
    }
  }




  return(
    <>
    <form onSubmit={handleSubmit}>
      <button type='submit'>Save Exam</button>
      <Title exam={examData} setExam={setExamData}/>
      <SelectedSection exam={examData} setExam={setExamData} />
    </form>
      
    </>
  )
}

export default HandleExam;