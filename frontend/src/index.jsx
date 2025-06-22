// import App from './App.jsx'; //js file for idk yet.. basta pwede ihiwalay i guess? like, routing and logic?
// import React from 'react';
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<BrowserRouter><App /></BrowserRouter>);

// // ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
// //createRoot(document.getElementById('root')).render(<App />);

import App from './teacherS/App.jsx'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);