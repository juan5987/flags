import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App/App';
import axios from 'axios';
import './login.sass';

const Login = ({ displayFunction }: any) => {
  const [formError, setFormError] = useState('');
  const context: any = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

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
            setIsLoading(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            setFormError(error.response.data.message);
          } else {
            setFormError('Impossible de contacter le serveur.');
          }
        });
    }
  };

  return (
    <div className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <div
          className='login__form__close'
          onClick={() => displayFunction(false)}
        >
          <div className='login__form__close__line1'></div>
          <div className='login__form__close__line2'></div>
        </div>
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
        <Link className='login__form__forgotPassword' to='/forgot-password'>
          Mot de passe oublié ?
        </Link>
        {formError && <span className='login__form__error'>{formError}</span>}
        {isLoading && (
          <div className='login__form__loading'>
            <div className='lds-ring'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className='login__form__loader'>Veuillez patienter</div>
          </div>
        )}
        <button
          className='login__form__submit button'
          style={{ fontSize: '1.5rem', marginBottom: 0 }}
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default Login;
