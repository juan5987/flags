import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { Link } from 'react-router-dom';

import './home.sass';

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <h1 className='home__title'>World Flags</h1>
      <div className='home__wrapper'>
        <div className='home__wrapper__description'>
          <p className='home__wrapper__description__paragraph'>
            Vous pensez connaitre la plupart des drapeaux du monde ? Ou vous
            souhaitez améliorer vos connaissances à ce sujet ? World Flags est
            fait pour vous !
          </p>
          <p className='home__wrapper__description__paragraph'>
            Apprenez en jouant grâce à notre quiz.
          </p>
        </div>
        <Link className='home__wrapper__start' to='/quiz'>
          Jouer
        </Link>
        <p className='home__wrapper__description__paragraph'>
          Enregistrez-vous pour sauvegarder votre score et essayer d'atteindre
          les premières places du classement.
        </p>
        <Link className='home__wrapper__start' to='/signup'>
          Créer mon compte
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
