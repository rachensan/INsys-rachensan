import axios from '../utils/axiosConfig.js';
import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext.jsx';

import Button from '../components/Buttons.jsx';



function CreateExam() {
  const { accessToken } = useAuth();

  const [examInfo, setExamInfo] = useState({
    title: "",
    schedule: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamInfo({ ...examInfo, [name]: value });
  };

  const handleCreateExam = async () => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    };

    try {
      const res = await axios.post("/exams", examInfo, config);
      console.log("Exam created:", res.data);
    } catch (err) {
      console.error("Failed to create exam:", err);
    }
  };


  return (
    <>
      d
    </>
  );
}

export default CreateExam;