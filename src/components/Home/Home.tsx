import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

import './home.sass';

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <div className='home__wrapper'>
        <Link className='home__wrapper__start' to='/quiz'>
          Let's start
        </Link>
      </div>
    </div>
  );
};

export default Home;
