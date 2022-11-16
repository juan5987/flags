import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Quiz from '../Quiz/Quiz';
import Rules from '../Rules/Rules';
import Signup from '../Signup/Signup';
import Rank from '../Rank/Rank';
import './app.sass';

const App = () => {
  return (
    <div className='app'>
      <div className='app__wrapper'>
        <Router basename='/flags'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/quiz' element={<Quiz />}></Route>
            <Route path='/rules' element={<Rules />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/rank' element={<Rank />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
