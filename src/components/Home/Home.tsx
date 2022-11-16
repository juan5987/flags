import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { Link } from 'react-router-dom';

import './home.sass';

const Home = () => {
  return (
    <main className='main'>
      <div className='main__background' />
      <header className='main__header'>
        <h1 className='main__header__title'>World Flags</h1>
        <h3 className='main__header__subtitle'>
          Devinez les drapeaux et entrez dans le top du classement
        </h3>
      </header>
      <div className='main__menu'>
        <Link to='/quiz' className='main__menu__button'>
          Jouer
        </Link>
        <Link to='/rules' className='main__menu__button'>
          Règles
        </Link>
        <Link to='/scores' className='main__menu__button'>
          Classement
        </Link>
        <Link to='login' className='main__menu__button'>
          Connexion
        </Link>
      </div>
    </main>
  );
};

export default Home;
