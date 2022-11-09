import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Quiz from '../Quiz/Quiz';
import Rules from '../Rules/Rules';
import './app.sass';

const App = () => {
  return (
    <div className='app'>
      <Router basename='/flags'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/quiz' element={<Quiz />}></Route>
          <Route path='/rules' element={<Rules />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
