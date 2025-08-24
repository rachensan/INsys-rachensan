import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axiosConfig.js';

//hooks
import { useExams } from '../hooks/useExams.js';
//components
import EnterExam from '../components/home-student/EnterExam.jsx';

function HomeStudent() {


  return (
    <>
      <EnterExam />
    </>
  );
}

export default HomeStudent;