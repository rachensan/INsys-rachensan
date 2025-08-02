import {Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from './utils/axiosConfig.js';
import { useAuth } from './context/AuthContext.jsx';

import RegisterStudent from './pages/RegisterStudent.jsx'


import Home from './teacherS/Home';
import HandleExam from './teacherS/HandleExam';
import SelectedSection from './teacherS/handleExam/2-Section';

import AllQuestions from './teacherS/handleExam/3-AllQuesType';
import Identification from './teacherS/handleExam/3-Identification';
import RegisterTeacher from './pages/RegisterTeacher.jsx';
import Login from './pages/Login.jsx';
import LogoutButton from './layout/logout.jsx';

function App() {
  const navigate = useNavigate();
  const { setAccessToken, setUser, user } = useAuth();

useEffect(() => {
  const publicPaths = ["/login", "/register/student", "/register/teacher"];
  if (publicPaths.includes(window.location.pathname)) return;

  axios.post("/refresh", {}, { withCredentials: true })
    .then(res => {
      const newToken = res.data.accessToken;
      const { userId, schoolId, fullName, role } = res.data.user || {};

      setAccessToken(res.data.accessToken);
      setUser({ userId, schoolId, fullName, role });
                            console.log("User after refresh: (obj)", { userId, schoolId, fullName, role }); //obj. for debugging only

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      console.log("Access token set:", newToken);
    })
    .catch(() => {
      setAccessToken('');
      navigate("/login");
    });
}, []);

                            useEffect(() => {
                              console.log("User updated: (from global context)", user);
                            }, [user]);

  return(
    <>
    <Link to='/home'> Back lang (/home) </Link> <br/><br/><br/>
    <LogoutButton /> <br/><br/><br/>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/create-exam' element={<HandleExam />} />
        <Route path='/handle-exam/:id' element={<HandleExam />} />
        <Route path='/register/student' element={<RegisterStudent />} />
        <Route path='/register/teacher' element={<RegisterTeacher />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App;