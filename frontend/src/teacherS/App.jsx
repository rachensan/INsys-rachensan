import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './Home';
import HandleExam from './HandleExam';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-exam' element={<HandleExam />} />
        <Route path='/handle-exam/:id' element={<HandleExam />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;