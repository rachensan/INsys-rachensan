import {BrowserRouter, Routes, Route, useNavigate, Link} from 'react-router-dom'

import RegisterStudent from './pages/RegisterStudent.jsx'


import Home from './teacherS/Home';
import HandleExam from './teacherS/HandleExam';
import SelectedSection from './teacherS/handleExam/2-Section';

import AllQuestions from './teacherS/handleExam/3-AllQuesType';
import Identification from './teacherS/handleExam/3-Identification';

function App() {
  return(
    <BrowserRouter>
    <Link to='/'> Home </Link> <br/><br/><br/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-exam' element={<HandleExam />} />
        <Route path='/handle-exam/:id' element={<HandleExam />} />
        <Route path='/register' element={<RegisterStudent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;