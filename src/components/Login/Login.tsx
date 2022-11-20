import React, { useContext, useState } from 'react';
import { UserContext } from '../App/App';
import axios from 'axios';
import './login.sass';

const Login = ({ displayFunction }: any) => {
  const [formError, setFormError] = useState('');
  const context: any = useContext(UserContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      setFormError('Tous les champs doivent être renseignés.');
    } else {
      setFormError('');

      const requestOptions: any = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          email,
          password,
        }),
        url: `${context.apiUrl}/auth/login`,
      };

      axios(requestOptions)
        .then((result: any) => {
          if (result.status === 200) {
            localStorage.setItem('userId', result.data.userId);
            localStorage.setItem('token', result.data.token);
            context.setUsername(result.data.username);
            context.setUserId(result.data.userId);
            context.setBestScore(result.data.bestScore);
            displayFunction(false);
            context.setIsLogged(true);
          }
        })
        .catch((error) => {
          setFormError(error.response.data.message);
        });
    }
  };

  return (
    <div className='login'>
      <div
        className='login__form__close'
        onClick={() => displayFunction(false)}
      >
        <div className='login__form__close__line1'></div>
        <div className='login__form__close__line2'></div>
      </div>
      <form className='login__form' onSubmit={handleSubmit}>
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
        {formError && <span className='login__form__error'>{formError}</span>}
        <button className='login__form__submit'>Valider</button>
      </form>
    </div>
  );
};

export default Login;
