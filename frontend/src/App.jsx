import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import WholeA from './teacherSide/2.0/WholeA.jsx'
import WholeB from './teacherSide/2.1/WholeB.jsx'

function App() {
    return (
        <>
        <Routes>
            <Header />
            <WholeA />
        </Routes>
        </>
    );
}

export default App;