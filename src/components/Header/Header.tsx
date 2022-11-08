import React from 'react';
import { Link } from 'react-router-dom';
import './header.sass';

const Header = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>Flags</h1>
      <nav className='header__nav'>
        <ul className='header__nav__list'>
          <li className='header__nav__list__element'>
            <Link className='header__nav__list__element__link' to='/'>
              Home
            </Link>
            <Link className='header__nav__list__element__link' to='/about'>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
