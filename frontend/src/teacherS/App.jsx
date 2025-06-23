import {BrowserRouter, Routes, Route, useNavigate, Link} from 'react-router-dom'

import Home from './Home';
import HandleExam from './HandleExam';
import SelectedSection from './handleExam/2-Section';

import AllQuestions from './handleExam/3-AllQuesType';
import Identification from './handleExam/3-Identification';

function App() {
  return(
    <BrowserRouter>
    <Link to='/'> Home </Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-exam' element={<HandleExam />} />
        <Route path='/handle-exam/:id' element={<HandleExam />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;