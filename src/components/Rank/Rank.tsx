import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App/App';
import { Link } from 'react-router-dom';
import './rank.sass';

const Rank = () => {
  const [rank, setRank]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context: any = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    axios(`${context.apiUrl}/rank`)
      .then((result) => {
        console.log(result.data);
        setRank(result.data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='rank'>
      <div className='rank__background'></div>
      {isLoading ? (
        <h2 className='rank__loading'> Récupération des scores... </h2>
      ) : (
        <>
          <h2 className='rank__title'>Le classement de World Flags</h2>
          <ul className='rank__list'>
            <li className='rank__list__element--head'>
              <span className='rank__list__element--head__rank'>Rang</span>
              <span className='rank__list__element--head__username'>
                Pseudo
              </span>
              <span className='rank__list__element--head__score'>Score</span>
            </li>
            <div className={'rank__list__element__wrapper'}>
              {rank[0] &&
                rank.map((player: any, index: any) => (
                  <li key={index} className='rank__list__element'>
                    <span className='rank__list__element__rank'>
                      #{player.rank}
                    </span>
                    <span className='rank__list__element__username'>
                      {player.username}
                    </span>
                    <span className='rank__list__element__score'>
                      {player.score}
                    </span>
                  </li>
                ))}
            </div>
          </ul>
          <Link className='rank__button' to='/'>
            Retourner au menu principal
          </Link>
        </>
      )}
    </div>
  );
};

export default Rank;
