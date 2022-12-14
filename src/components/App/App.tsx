import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Quiz from '../Quiz/Quiz';
import Rules from '../Rules/Rules';
import Signup from '../Signup/Signup';
import Rank from '../Rank/Rank';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import Background from '../Background/Background';
import './app.sass';

export const UserContext: any = createContext(null);

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [bestScore, setBestScore] = useState(0);
  const apiUrl = 'https://www.api.worldflags.fr';

  // if (window.location.href.slice(8, 11) !== 'www') {
  //   window.location.href = 'https://www.worldflags.fr';
  // }

  const contextValue: any = {
    isLogged,
    setIsLogged,
    username,
    setUsername,
    bestScore,
    setBestScore,
    apiUrl,
    userId,
    setUserId,
  };
  return (
    <div className='app'>
      <Background>
        <UserContext.Provider value={contextValue}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/quiz' element={<Quiz />}></Route>
            <Route path='/rules' element={<Rules />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/rank' element={<Rank />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route
              path='/resetpassword/:token'
              element={<ResetPassword />}
            ></Route>
          </Routes>
        </UserContext.Provider>
      </Background>
    </div>
  );
};

export default App;
