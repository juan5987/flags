import React from 'react';
import Header from '../Header/Header';
import './rules.sass';

const Rules = () => {
  return (
    <div className='rules'>
      <Header />
      <div className='rules__wrapper'>
        <h2 className='rules__wrapper__title'>Les règles de World Flags</h2>
        <ol className='rules__wrapper__list'>
          <li className='rules__wrapper__list__element'>
            <span className='rules__wrapper__list__element__title'>
              1. Temps de jeu:
            </span>
            <span className='rules__wrapper__list__element__content'>
              Vous avez 90 secondes pour réaliser le quiz et cumuler un maximum
              de points suite à quoi la partie se termine.
            </span>
          </li>
          <li className='rules__wrapper__list__element'>
            <span className='rules__wrapper__list__element__title'>
              2. Syntaxe
            </span>
            <span className='rules__wrapper__list__element__content'>
              Attention, la syntaxe doit être parfaitement respectée pour que la
              réponse soit considérée correcte. N'oubliez pas les accents, les
              espaces ou encore les tirets ! Une tolérance est accordée pour les
              majuscules.
            </span>
          </li>
          <li className='rules__wrapper__list__element'>
            <span className='rules__wrapper__list__element__title'>
              3. Score:{' '}
            </span>
            <span className='rules__wrapper__list__element__content'>
              En cas de bonne réponse, vous gagnez 3 points, si vous passez ou
              que vous vous trompez, vous perdrez 1 point.
            </span>
          </li>
          <li className='rules__wrapper__list__element'>
            <span className='rules__wrapper__list__element__title'>
              4. Sauvegarde du score:{' '}
            </span>
            <span className='rules__wrapper__list__element__content'>
              Une fois la partie terminée, votre score est sauvegardé uniquement
              si vous avez créé un compte et que vous vous êtes authentifié.
            </span>
          </li>
          <li className='rules__wrapper__list__element'>
            <span className='rules__wrapper__list__element__title'>
              5. Classement:{' '}
            </span>
            <span className='rules__wrapper__list__element__content'>
              Quand vous réalisez votre meilleur score, ce dernier est
              enregistré. Si vous réalisez un des 10 meilleurs scores de tous
              les utilisateurs, ce dernier apparaitra sur la page "meilleurs
              scores"
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Rules;
