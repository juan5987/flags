import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Quiz from '../Quiz/Quiz';
import './app.sass';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/quiz' element={<Quiz />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
