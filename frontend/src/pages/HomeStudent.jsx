import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axiosConfig.js';

//hooks
import { useExams } from '../hooks/useExams.js';
//components
import Button from '../components/Buttons.jsx';
import DraftExams from '../components/home-teacher/DraftExams.jsx';
import OngoingExams from '../components/home-teacher/OngoingExams.jsx';
import CompletedExams from '../components/home-teacher/CompletedExams.jsx';

function HomeStudent() {

  return (
    <>
      sup student, wala pa ako malagay
    </>
  );
}

export default HomeStudent;