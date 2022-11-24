import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App/App';
import './forgotpassword.sass';

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const context: any = React.useContext(UserContext);

  const handleSubmit = (e: any) => {
    setErrorMsg('');
    setSuccessMsg(false);
    e.preventDefault();
    setLoading(true);
    const requestOptions: any = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        email: e.target[0].value,
      }),
      url: `${context.apiUrl}/auth/resetpassword`,
    };
    axios(requestOptions)
      .then((result: any) => {
        if (result.status === 200) {
          setSuccessMsg(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className='forgotPassword'>
      <div className='forgotPassword__background'></div>
      <form className='forgotPassword__form' onSubmit={handleSubmit}>
        <h2 className='forgotPassword__form__title'>
          Récupération du mot de passe
        </h2>
        <p className='forgotPassword__form__description'>
          Veuillez saisir votre adresse email. Si elle existe dans notre base de
          données, un email vous sera envoyé pour réinitialiser votre mot de
          passe.
        </p>
        <div className='forgotPassword__form__element'>
          <label
            className='forgotPassword__form__element__label'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='forgotPassword__form__element__input'
            type='email'
            name='email'
            id='email'
          />
        </div>
        {loading && (
          <span className='forgotPassword__form__loading'>
            Veuillez patienter
          </span>
        )}
        {successMsg && (
          <span className='forgotPassword__form__success'>
            Email envoyé, verifiez votre boite mail
          </span>
        )}
        {errorMsg && (
          <span className='forgotPassword__form__error'>{errorMsg}</span>
        )}
        {!successMsg && (
          <button className='forgotPassword__form__submit' type='submit'>
            Envoyer
          </button>
        )}
      </form>
      <Link className='forgotPassword__home' to='/'>
        Retour au menu principal
      </Link>
    </div>
  );
};

export default ForgotPassword;
