import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './login.jsx';
import Card from './redirect.jsx';
import Predict from './predicted.jsx';
import Signup from './sign-up.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/redirect" element={<Card />} />
        <Route exact path="/predicted" element={<Predict />}/>
        <Route exact path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
