import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.sass';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__nav__list'>
          <li className='header__nav__list__element'>
            <Link className='header__nav__list__element__link' to='/'>
              Accueil
            </Link>
          </li>
          <li className='header__nav__list__element'>
            <Link
              className='header__nav__list__element__link'
              to='/best-scores'
            >
              Meilleurs scores
            </Link>
          </li>
          <li className='header__nav__list__element'>
            <Link className='header__nav__list__element__link' to='/rules'>
              Règles
            </Link>
          </li>
          <li className='header__nav__list__element'>
            <Link className='header__nav__list__element__link' to='/login'>
              Connexion
            </Link>
          </li>
        </ul>
      </nav>
      <nav className='header__nav-mobile'>
        <h2 className='header__menu-mobile'>Menu</h2>
        <ul className='header__nav-mobile__list'>
          <li className='header__nav-mobile__list__element-burger'>
            {!isMobileMenuOpen && (
              <div
                className='header__nav-mobile__list__element-burger__burger'
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <div className='header__nav-mobile__list__element-burger__burger__line'></div>
                <div className='header__nav-mobile__list__element-burger__burger__line'></div>
                <div className='header__nav-mobile__list__element-burger__burger__line'></div>
              </div>
            )}
            {isMobileMenuOpen && (
              <div
                className='header__nav-mobile__list__element-burger__cross'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className='header__nav-mobile__list__element-burger__cross__line1'></div>
                <div className='header__nav-mobile__list__element-burger__cross__line2'></div>
              </div>
            )}
          </li>
          {isMobileMenuOpen && (
            <>
              <li className='header__nav-mobile__list__element'>
                <Link
                  className='header__nav-mobile__list__element__link'
                  to='/'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
              </li>
              <li className='header__nav-mobile__list__element'>
                <Link
                  className='header__nav-mobile__list__element__link'
                  to='/best-scores'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Meilleurs scores
                </Link>
              </li>
              <li className='header__nav-mobile__list__element'>
                <Link
                  className='header__nav-mobile__list__element__link'
                  to='/rules'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Règles
                </Link>
              </li>
              <li className='header__nav-mobile__list__element'>
                <Link
                  className='header__nav-mobile__list__element__link'
                  to='/login'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
