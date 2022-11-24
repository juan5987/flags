import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../App/App';
import axios from 'axios';
import './resetpassword.sass';

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState(false);
  const token = useParams().token;
  const context: any = React.useContext(UserContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!e.target[0].value || !e.target[1].value) {
      setSuccessMsg(false);
      setErrorMsg('Veuillez remplir tous les champs');
      return;
    } else if (e.target[0].value !== e.target[1].value) {
      setSuccessMsg(false);
      setErrorMsg('Les mots de passe ne correspondent pas');
      return;
    } else {
      setErrorMsg('');
      const requestOptions: any = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          password: e.target[0].value,
        }),
        url: `${context.apiUrl}/auth/resetpassword/${token}`,
      };
      axios(requestOptions)
        .then((result: any) => {
          if (result.status === 200) {
            setSuccessMsg(true);
          }
        })
        .catch((error) => {
          setErrorMsg(error.response.data.message);
        });
    }
  };

  return (
    <div className='resetPassword'>
      <form className='resetPassword__form' onSubmit={handleSubmit}>
        <Link className='login__form__close' to='/'>
          <div className='login__form__close__line1'></div>
          <div className='login__form__close__line2'></div>
        </Link>
        <h2 className='resetPassword__form__title'>
          Modification du mot de passe
        </h2>
        <p className='resetPassword__form__description'>
          Veuillez saisir votre nouveau mot de passe
        </p>
        <div className='resetPassword__form__element'>
          <label
            className='resetPassword__form__element__label'
            htmlFor='password'
          >
            Mot de passe
          </label>
          <input
            className='resetPassword__form__element__input'
            type='password'
            name='password'
            id='password'
          />
        </div>
        <div className='resetPassword__form__element'>
          <label
            className='resetPassword__form__element__label'
            htmlFor='new-password'
          >
            Confirmation du mot de passe
          </label>
          <input
            className='resetPassword__form__element__input'
            type='password'
            name='new-password'
            id='new-password'
          />
        </div>
        {successMsg && (
          <span className='resetPassword__form__success'>
            Votre mot de passe a bien été modifié. Vous pouvez vous connecter.
          </span>
        )}
        {errorMsg && (
          <span className='resetPassword__form__error'>{errorMsg}</span>
        )}
        {!successMsg && (
          <button className='resetPassword__form__submit button' type='submit'>
            Envoyer
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
