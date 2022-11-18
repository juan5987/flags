import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './rank.sass';

const Rank = () => {
  const [rank, setRank] = useState([
    {
      rank: 1,
      username: 'Juan',
      score: 56,
      date: '16/11/2022',
    },
    {
      rank: 2,
      username: 'Karm',
      score: 48,
      date: '16/11/2022',
    },
    {
      rank: 3,
      username: 'Naktaam',
      score: 47,
      date: '16/11/2022',
    },
    {
      rank: 4,
      username: 'Excalibur59',
      score: 42,
      date: '16/11/2022',
    },
    {
      rank: 5,
      username: 'Wills',
      score: 38,
      date: '16/11/2022',
    },
    {
      rank: 6,
      username: 'Kayser',
      score: 32,
      date: '16/11/2022',
    },
    {
      rank: 7,
      username: 'Titus',
      score: 31,
      date: '16/11/2022',
    },
    {
      rank: 8,
      username: 'Oliver',
      score: 24,
      date: '16/11/2022',
    },
    {
      rank: 9,
      username: 'Bob',
      score: 19,
      date: '16/11/2022',
    },
    {
      rank: 10,
      username: 'bgdu62',
      score: 2,
      date: '16/11/2022',
    },
  ]);

  return (
    <div className='rank'>
      <div className='rank__background'></div>
      <h2 className='rank__title'>Le classement de World Flags</h2>
      <ul className='rank__list'>
        <li className='rank__list__element--head'>
          <span className='rank__list__element--head__rank'>Rang</span>
          <span className='rank__list__element--head__username'>Pseudo</span>
          <span className='rank__list__element--head__score'>Score</span>
          <span className='rank__list__element--head__date'>Date</span>
        </li>
        <div className={'rank__list__element__wrapper'}>
          {rank &&
            rank.map((player) => (
              <li className='rank__list__element'>
                <span className='rank__list__element__rank'>
                  #{player.rank}
                </span>
                <span className='rank__list__element__username'>
                  {player.username}
                </span>
                <span className='rank__list__element__score'>
                  {player.score}
                </span>
                <span className='rank__list__element__date'>{player.date}</span>
              </li>
            ))}
        </div>
      </ul>
      <Link className='rank__button' to='/'>
        Retourner au menu principal
      </Link>
    </div>
  );
};

export default Rank;
