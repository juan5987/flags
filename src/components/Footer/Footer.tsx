import React from 'react';
import { Link } from 'react-router-dom';
import github_logo from '../../static/images/github.svg';
import './footer.sass';

const Footer = () => {
  return (
    <footer className='footer'>
      <a href='https://github.com/juan5987' className='footer__link'>
        Site web réalisé par Juan5987
        <img
          className='footer__link__logo'
          src={github_logo}
          alt='logo github'
        />
      </a>
    </footer>
  );
};

export default Footer;
