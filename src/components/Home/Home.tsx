import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { Link } from 'react-router-dom';

import './home.sass';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__background' />
      <header className='home__header'>
        <h1 className='home__header__title'>World Flags</h1>
        <h3 className='home__header__subtitle'>
          Devinez les drapeaux et entrez dans le top du classement
        </h3>
      </header>
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
        <Link to='login' className='home__menu__button'>
          Connexion
        </Link>
      </div>
    </div>
  );
};

export default Home;
