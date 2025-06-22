import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Title } from "./handleExam/1-Title";

function HandleExam() {
  const navigate = useNavigate();
  const {id} = useParams();
  
  const [exam, setExam] = useState({
    title: '',
    schedule: '',
    status: 'pending',
  })

//useEffect will work IF there is an existing id
  useEffect(()=>{
    if(id) {
      axios.get(`http://localhost:3000/api/exams/${id}`)
        .then(res => {setExam(res.data)})
        .catch(err=>{console.error(err)})
    }
  }, [id])  
//it will be skipped, if no id seen, it will create a new one

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) { //if existing: EDIT mode
      axios.put(`http://localhost:3000/api/exams/${id}`, exam)
        .then(res=>console.log('exam updated'))
        .catch(err=>console.error(err))
    } else { //if NOT existing: CREATE-NEW mode
      const newExam = { ...exam}
      axios.post('http://localhost:3000/api/exams', newExam)
        .then(res=> {
          setExam({title: '', schedule: '', status: 'pending'}); //auto reset form for future creations
          navigate('/');
        })
        .catch(err=> console.log(err))
    }
  }
  return(
    <>
      <Title examData={exam} setExam={setExam}/>
    </>
  )
}

export default HandleExam;