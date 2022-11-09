import React from 'react';
import { Link } from 'react-router-dom';
import './header.sass';

const Header = () => {
  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__nav__list'>
          <li className='header__nav__list__element'>
            <Link className='header__nav__list__element__link' to='/'>
              Accueil
            </Link>
            <Link
              className='header__nav__list__element__link'
              to='/best-scores'
            >
              Meilleurs scores
            </Link>
            <Link className='header__nav__list__element__link' to='/rules'>
              Règles
            </Link>
            <Link className='header__nav__list__element__link' to='/login'>
              Connexion
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
