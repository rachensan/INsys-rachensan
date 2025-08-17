import {Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from './utils/axiosConfig.js';
import { useAuth } from './context/AuthContext.jsx';

//Pages
import Login from './pages/Login.jsx';
import RegisterTeacher from './pages/RegisterTeacher.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx'
import Home from './pages/Home.jsx';
import UpdateExam from './pages/UpdateExam.jsx';
import Welcome from './pages/Welcome.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';

//Layout
import LogoutButton from './components/Logout.jsx';
import CreateExam from './pages/CreateExam.jsx';


function App() {
  const navigate = useNavigate();
  const { setAccessToken, setUser, user } = useAuth();

useEffect(() => {
  const publicPaths = ["/login", "/register/student", "/register/teacher", "/welcome-register", "/forgot-password"];
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
        <Route path='/create-exam' element={<CreateExam />} />
        <Route path='/update-exam/:examId' element={<UpdateExam />} />
        <Route path='/register/student' element={<RegisterStudent />} />
        <Route path='/register/teacher' element={<RegisterTeacher />} />
        <Route path='/login' element={<Login />} />

        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/welcome-register' element={<Welcome />} />
      </Routes>
    </>
  )
}

export default App;