import React, { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import { UserContext } from '../App/App';
import './home.sass';
import '../../static/css/global.sass';

const Home = () => {
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const context: any = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    context.setIsLogged(false);
    context.setUsername('');
    context.setUserId(0);
    context.setBestScore(0);
    context.setBestScore(0);
  };

  return (
    <div className='home'>
      {isLoginModalOpened && <Login displayFunction={setIsLoginModalOpened} />}
      <h1 className='home__title'>World Flags</h1>
      <h2 className='home__subtitle'>
        Testez votre connaissance des drapeaux du monde avec notre quiz et
        atteignez le sommet du classement
      </h2>

      {context.isLogged && (
        <div className='home__score'>
          <span className='home__score__welcome'>
            Bienvenue {context.username}
          </span>
          {context.bestScore ? (
            <span className='home__score__content'>
              Votre meilleur score est : {context.bestScore}
            </span>
          ) : (
            <span className='home__score__content'>
              Vous n'avez aucun score enregistré
            </span>
          )}
        </div>
      )}

      <div className='home__menu'>
        <Link to='/quiz' className='button'>
          Jouer
        </Link>
        <Link to='/rules' className='button'>
          Règles
        </Link>
        <Link to='/rank' className='button'>
          Classement
        </Link>
        {context.isLogged ? (
          <button className='button' onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          <button
            className='button'
            onClick={() => setIsLoginModalOpened(true)}
          >
            Connexion
          </button>
        )}
        {!context.isLogged && (
          <Link
            to='/signup'
            className='button'
            style={{ color: '#ff9f1c', border: '5px solid #ff9f1c' }}
          >
            Inscription
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
