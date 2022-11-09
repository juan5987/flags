import React from 'react';
import Header from '../Header/Header';
import './rules.sass';

const Rules = () => {
  return (
    <div className='rules'>
      <Header />
      <div className='wrapper'>
        <h2>Les règles de World Flags</h2>
        <ol>
          <li>
            <span>1. Temps de jeu:</span>
            <span>
              Vous avez 90 secondes pour réaliser le quiz et cumuler un maximum
              de points suite à quoi la partie se termine.
            </span>
          </li>
          <li>
            <span>2. Score: </span>
            <span>
              En cas de bonne réponse, vous gagnez 3 points, si vous passez ou
              que vous vous trompez, vous perdrez 1 point.
            </span>
          </li>
          <li>
            <span>3. Sauvegarde du score: </span>
            <span>
              Une fois la partie terminée, votre score est sauvegardé si vous
              avez créé un compte et que vous vous êtes authentifié.
            </span>
          </li>
          <li>
            <span>3. Classement: </span>
            <span>
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
