import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import './signup.sass';

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    email_confirm: '',
    password: '',
    password_confirm: '',
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    email_confirm: '',
    password: '',
    password_confirm: '',
    global: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formValues.username ||
      !formValues.email ||
      !formValues.email_confirm ||
      !formValues.password ||
      !formValues.password_confirm
    ) {
      setError({
        ...error,
        global: 'Tous les champs doivent être renseignés',
      });
    } else if (
      formValues.username.length < 3 ||
      formValues.username.length > 18
    ) {
      setError({
        ...error,
        global: '',
        username: "Le nom d'utilisateur doit contenir entre 3 et 18 caractères",
      });
    } else if (formValues.email !== formValues.email_confirm) {
      setError({
        ...error,
        global: '',
        email: 'Les adresses email ne correspondent pas',
        email_confirm: 'Les adresses email ne correspondent pas',
      });
    } else if (formValues.password !== formValues.password_confirm) {
      setError({
        ...error,
        global: '',
        password: 'Les mots de passe ne correspondent pas',
        password_confirm: 'Les mots de passe ne correspondent pas',
      });
    } else {
      setError({
        username: '',
        email: '',
        email_confirm: '',
        password: '',
        password_confirm: '',
        global: '',
      });
    }
  };

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='signup'>
      <Link className='signup__form__close' to='/'>
        <div className='signup__form__close__line1'></div>
        <div className='signup__form__close__line2'></div>
      </Link>
      <div className='signup__background'></div>
      <form className='signup__form' onSubmit={handleSubmit}>
        <h2 className='signup__title'>Inscription</h2>
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
          {error.username && (
            <span className='signup__form__element__error'>
              {error.username}
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
          {error.email && (
            <span className='signup__form__element__error'>{error.email}</span>
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
          {error.email_confirm && (
            <span className='signup__form__element__error'>
              {error.email_confirm}
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
          {error.password && (
            <span className='signup__form__element__error'>
              {error.password}
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
          {error.password_confirm && (
            <span className='signup__form__element__error'>
              {error.password_confirm}
            </span>
          )}
        </div>
        {error.global && (
          <span className='signup__form__element__error'>{error.global}</span>
        )}
        <button className='signup__form__submit' type='submit'>
          Valider
        </button>
      </form>
      <Link to='/' className='signup__home'>
        Retour au menu principal
      </Link>
    </div>
  );
};

export default Signup;
