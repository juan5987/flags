import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App/App';
import eye from '../../static/images/eye.svg';
import eyeOff from '../../static/images/eye-off.svg';
import './signup.sass';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const context: any = useContext(UserContext);
  const [sucessMsg, setSucessMsg] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    global: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formValues.username ||
      !formValues.email ||
      !formValues.emailConfirm ||
      !formValues.password ||
      !formValues.passwordConfirm
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
    } else if (formValues.email !== formValues.emailConfirm) {
      setError({
        ...error,
        global: '',
        email: 'Les adresses email ne correspondent pas',
        emailConfirm: 'Les adresses email ne correspondent pas',
      });
    } else if (formValues.password !== formValues.passwordConfirm) {
      setError({
        ...error,
        global: '',
        password: 'Les mots de passe ne correspondent pas',
        passwordConfirm: 'Les mots de passe ne correspondent pas',
      });
    } else {
      setError({
        username: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        global: '',
      });
      const requestOptions: any = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          emailConfirm: formValues.emailConfirm,
          password: formValues.password,
          passwordConfirm: formValues.passwordConfirm,
        }),
        url: `${context.apiUrl}/auth/signup`,
      };
      axios(requestOptions)
        .then((result: any) => {
          if (result.status === 201) {
            console.log(result);
            setSucessMsg(true);
            context.setUsername(result.data.username);
            context.setUserId(result.data.id);
            context.setIsLogged(true);
            setTimeout(() => {
              setSucessMsg(false);
              navigate('/');
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          setError({
            ...error,
            global: error.response.data.message,
          });
        });
    }
  };

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
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
            htmlFor='emailConfirm'
          >
            Confirmation de l'email
          </label>
          <input
            type='email'
            className='signup__form__element__input'
            id='emailConfirm'
            onChange={handleChange}
            value={formValues.emailConfirm}
            autoComplete='email'
          />
          {error.emailConfirm && (
            <span className='signup__form__element__error'>
              {error.emailConfirm}
            </span>
          )}
        </div>
        <div className='signup__form__element'>
          <label className='signup__form__element__label' htmlFor='password'>
            Mot de passe
          </label>
          <input
            className='signup__form__element__input'
            type={showPassword ? 'text' : 'password'}
            id='password'
            onChange={handleChange}
            value={formValues.password}
            autoComplete='new-password'
          />
          {showPassword ? (
            <div
              className='signup__form__element__eye'
              onClick={togglePassword}
            >
              <img src={eye} alt='oeil' />
            </div>
          ) : (
            <div
              className='signup__form__element__eye'
              onClick={togglePassword}
            >
              <img src={eyeOff} alt='oeil' />
            </div>
          )}
          {error.password && (
            <span className='signup__form__element__error'>
              {error.password}
            </span>
          )}
        </div>
        <div className='signup__form__element'>
          <label
            className='signup__form__element__label'
            htmlFor='passwordConfirm'
          >
            Confirmation du mot de passe
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className='signup__form__element__input'
            id='passwordConfirm'
            onChange={handleChange}
            value={formValues.passwordConfirm}
            autoComplete='new-password'
          />
          {showPassword ? (
            <div
              className='signup__form__element__eye'
              onClick={togglePassword}
            >
              <img src={eye} alt='oeil' />
            </div>
          ) : (
            <div
              className='signup__form__element__eye'
              onClick={togglePassword}
            >
              <img src={eyeOff} alt='oeil' />
            </div>
          )}
          {error.passwordConfirm && (
            <span className='signup__form__element__error'>
              {error.passwordConfirm}
            </span>
          )}
        </div>
        {error.global && (
          <span className='signup__form__element__error'>{error.global}</span>
        )}
        <button className='signup__form__submit' type='submit'>
          Valider
        </button>
        {sucessMsg && (
          <span className='signup__form__success'>
            inscription validé, veuillez patienter vous allez être redirigé.
          </span>
        )}
      </form>
      <Link to='/' className='signup__home'>
        Retour au menu principal
      </Link>
    </div>
  );
};

export default Signup;
