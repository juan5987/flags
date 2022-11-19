import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import { UserContext } from '../App/App';
import './home.sass';

const Home = () => {
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [isSignupModalOpened, setIsSignupModalOpened] = useState(false);
  const [formError, setFormError] = useState('');
  const context: any = useContext(UserContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      setFormError('Tous les champs doivent être renseignés.');
    } else {
      setFormError('');

      const requestOptions: any = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          email,
          password,
        }),
        url: `${context.apiUrl}/auth/login`,
      };

      axios(requestOptions)
        .then((result: any) => {
          if (result.status === 200) {
            localStorage.setItem('userId', result.data.userId);
            localStorage.setItem('token', result.data.token);
            context.setUsername(result.data.username);
            context.setBestScore(result.data.bestScore);
            setIsLoginModalOpened(false);
            context.setIsLogged(true);
          } else {
            throw new Error(result.response.data.message);
          }
        })
        .catch((error) => {
          setFormError(error.response.data.message);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    context.setIsLogged(false);
    context.setUsername('');
    context.setBestScore(0);
  };

  return (
    <div className='home'>
      <div className='home__background' />
      {isLoginModalOpened && (
        <Login
          displayFunction={setIsLoginModalOpened}
          submitFunction={handleSubmit}
          error={formError}
        />
      )}

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
        <Link
          to='/signup'
          className='home__menu__button home__menu__button--signup'
        >
          Inscription
        </Link>
      </div>
    </div>
  );
};

export default Home;
