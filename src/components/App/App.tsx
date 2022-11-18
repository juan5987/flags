import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Quiz from '../Quiz/Quiz';
import Rules from '../Rules/Rules';
import Signup from '../Signup/Signup';
import Rank from '../Rank/Rank';
import './app.sass';

export const UserContext: any = createContext(null);

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [bestScore, setBestScore] = useState(0);
  const contextValue: any = {
    isLogged,
    setIsLogged,
    username,
    setUsername,
    bestScore,
    setBestScore,
  };
  return (
    <div className='app'>
      <div className='app__wrapper'>
        <Router basename='/'>
          <UserContext.Provider value={contextValue}>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/quiz' element={<Quiz />}></Route>
              <Route path='/rules' element={<Rules />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/rank' element={<Rank />}></Route>
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </div>
  );
};

export default App;
