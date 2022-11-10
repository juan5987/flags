import React from 'react';
import Header from '../Header/Header';
import './signup.sass';

const Signup = () => {
  return (
    <div className='signup'>
      <Header />
      <h2 className='signup__title'>Création d'un compte</h2>
      <form className='signup__form'>
        <div className='signup__form__element'>
          <label className='signup__form__element__label' htmlFor='username'>
            Nom d'utilisateur
          </label>
          <input
            className='signup__form__element__input'
            type='text'
            id='username'
          />
        </div>
        <div className='signup__form__element'>
          <label className='signup__form__element__label' htmlFor='email'>
            Email
          </label>
          <input
            className='signup__form__element__input'
            type='email'
            id='email'
          />
        </div>
        <div className='signup__form__element'>
          <label
            className='signup__form__element__label'
            htmlFor='email_confirm'
          >
            Confirmation de l'email
          </label>
          <input
            type='email'
            className='signup__form__element__input'
            id='email_confirm'
          />
        </div>
        <div className='signup__form__element'>
          <label className='signup__form__element__label' htmlFor='password'>
            Mot de passe
          </label>
          <input
            className='signup__form__element__input'
            type='password'
            id='password'
          />
        </div>
        <div className='signup__form__element'>
          <label
            className='signup__form__element__label'
            htmlFor='password_confirm'
          >
            Confirmation du mot de passe
          </label>
          <input
            type='password'
            className='signup__form__element__input'
            id='password_confirm'
          />
        </div>
        <button className='signup__form__submit' type='submit'>
          Valider
        </button>
      </form>
    </div>
  );
};

export default Signup;
