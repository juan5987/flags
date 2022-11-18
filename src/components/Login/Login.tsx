import React from 'react';
import './login.sass';

const Login = ({ displayFunction, submitFunction, error }: any) => {
  return (
    <div className='login'>
      <div
        className='login__form__close'
        onClick={() => displayFunction(false)}
      >
        <div className='login__form__close__line1'></div>
        <div className='login__form__close__line2'></div>
      </div>
      <form className='login__form' onSubmit={submitFunction}>
        <h2 className='login__title'>Connexion</h2>
        <div className='login__form__element'>
          <label className='login__form__element__label' htmlFor='email'>
            Email
          </label>
          <input
            className='login__form__element__input'
            type='email'
            autoComplete='email'
          />
        </div>
        <div className='login__form__element'>
          <label className='login__form__element__label' htmlFor='password'>
            Mot de passe
          </label>
          <input
            className='login__form__element__input'
            type='password'
            autoComplete='current-password'
          />
        </div>
        <span className='login__form__error'>{error}</span>
        <button className='login__form__submit'>Valider</button>
      </form>
    </div>
  );
};

export default Login;
