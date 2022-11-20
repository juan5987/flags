import React, { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import { UserContext } from '../App/App';
import './home.sass';

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
      <div className='home__background' />
      {isLoginModalOpened && <Login displayFunction={setIsLoginModalOpened} />}

      <header className='home__header'>
        <h1 className='home__header__title'>World Flags</h1>
        <h3 className='home__header__subtitle'>
          Devinez les drapeaux et entrez dans le top du classement
        </h3>
      </header>
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
        <Link to='/quiz' className='home__menu__button'>
          Jouer
        </Link>
        <Link to='/rules' className='home__menu__button'>
          Règles
        </Link>
        <Link to='/rank' className='home__menu__button'>
          Classement
        </Link>
        {context.isLogged ? (
          <button className='home__menu__button' onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          <button
            className='home__menu__button'
            onClick={() => setIsLoginModalOpened(true)}
          >
            Connexion
          </button>
        )}
        {!context.isLogged && (
          <Link
            to='/signup'
            className='home__menu__button home__menu__button--signup'
          >
            Inscription
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
