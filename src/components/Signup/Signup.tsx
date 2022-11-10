import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './signup.sass';

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    email_confirm: '',
    password: '',
    password_confirm: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
  };

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='signup'>
      <Header />
      <h2 className='signup__title'>Création d'un compte</h2>
      <form className='signup__form' onSubmit={handleSubmit}>
        <div className='signup__form__element'>
          <label className='signup__form__element__label' htmlFor='username'>
            Nom d'utilisateur
          </label>
          <input
            className='signup__form__element__input'
            type='text'
            id='username'
            onChange={handleChange}
            value={formValues.username}
            autoComplete='username'
          />
          {error && (
            <span className='signup__form__element__error'>
              Ce nom d'utilisateur est déjà utilisé
            </span>
          )}
        </div>
        <div className='signup__form__element'>
          <label className='signup__form__element__label' htmlFor='email'>
            Email
          </label>
          <input
            className='signup__form__element__input'
            type='email'
            id='email'
            onChange={handleChange}
            value={formValues.email}
            autoComplete='email'
          />
          {error && (
            <span className='signup__form__element__error'>
              Cette adresse email est déjà utilisée
            </span>
          )}
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
            onChange={handleChange}
            value={formValues.email_confirm}
            autoComplete='email'
          />
          {error && (
            <span className='signup__form__element__error'>
              L'adresse mail ne correspond pas
            </span>
          )}
        </div>
        <div className='signup__form__element'>
          <label className='signup__form__element__label' htmlFor='password'>
            Mot de passe
          </label>
          <input
            className='signup__form__element__input'
            type='password'
            id='password'
            onChange={handleChange}
            value={formValues.password}
            autoComplete='new-password'
          />
          {error && (
            <span className='signup__form__element__error'>
              Le mot de passe doit contenir au moins 8 caractères
            </span>
          )}
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
            onChange={handleChange}
            value={formValues.password_confirm}
            autoComplete='new-password'
          />
          {error && (
            <span className='signup__form__element__error'>
              Le mot de passe doit contenir au moins 8 caractères
            </span>
          )}
        </div>
        <button className='signup__form__submit' type='submit'>
          Valider
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Signup;
