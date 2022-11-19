import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './rules.sass';
import { Link } from 'react-router-dom';

const Rules = () => {
  return (
    <div className='rules'>
      <div className='rules__background'></div>
      <h2 className='rules__title'>Les règles de World Flags</h2>
      <ol className='rules__list'>
        <li className='rules__list__element'>
          <span className='rules__list__element__title'>
            1. Règles générales:
          </span>
          <span className='rules__list__element__content'>
            Un quiz dure <b>90 secondes</b>, pendant ce temps, vous devez
            cumuler un maximum de points.{' '}
            <b>Pour chaque bonne réponse, vous gagnez 3 points</b>. Mais
            attention,{' '}
            <b>
              si vous ne trouvez pas la réponse en passant ou en vous trompant,
              vous perdez 1 points en sachant que vous ne pouvez pas avoir un
              score négatif.
            </b>
            .
          </span>
          <span className='rules__list__element__content'>
            A vous de faire le bon choix, passer, ou prendre le temps de
            réfléchir pour éviter de perdre top de point.
          </span>
        </li>
        <li className='rules__list__element'>
          <span className='rules__list__element__title'>2. Syntaxe</span>
          <span className='rules__list__element__content'>
            Afin de simplifier le quiz, notamment en raison du temps imparti,
            World Flags{' '}
            <b>
              ne tient pas compte des majuscules, accents, espaces, ou tirets
            </b>
            .
          </span>
          <span className='rules__list__element__content'>
            Exemple: si vous répondez <b>cote d'ivoire</b> pour{' '}
            <b>Côte d'Ivoire</b>, la réponse sera considérée correcte. De même
            pour <b>etats unis</b> au lieu de <b>États-Unis</b>.
          </span>
        </li>
        <li className='rules__list__element'>
          <span className='rules__list__element__title'>
            3. Sauvegarde du score:{' '}
          </span>
          <span className='rules__list__element__content'>
            <b>Vous devez être authentifié</b> pour pouvoir sauvegarder votre
            score. Si vous souhaitez apparaître dans le classement des meilleurs
            scores, <b>pensez donc à vous enregistrer</b> sur le site.
          </span>
        </li>
        <li className='rules__list__element'>
          <span className='rules__list__element__title'>5. Classement: </span>
          <span className='rules__list__element__content'>
            La première fois que vous jouez, puis à chaque fois que vous
            réalisez votre <b>record personnel</b>, ce dernier est actualisé
            dans notre base de données. Vous pourrez vous situer dans le
            classement{' '}
            <b>en cliquant sur le bouton classement du menu principal</b>.
          </span>
          <span className='rules__list__element__content'>
            Apprenez en vous amusant et améliorer votre score pour atteindre le
            haut du classement.
          </span>
        </li>
        <li className='rules__list__element'>
          <Link className='rules__list__element__button' to='/'>
            Retourner au menu principal
          </Link>
        </li>
      </ol>

      <Footer />
    </div>
  );
};

export default Rules;
