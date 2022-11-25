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
      {isLoading ? (
        <h2 className='rank__loading'> Récupération des scores... </h2>
      ) : (
        <>
          <h1 className='home__title rank__title'>World Flags</h1>
          <div className='rank__wrapper'>
            <h2 className='rank__wrapper__title'>Classement</h2>
            <ul className='rank__wrapper__list'>
              <li className='rank__wrapper__list__element--head'>
                <span className='rank__wrapper__list__element--head__rank'>
                  Rang
                </span>
                <span className='rank__wrapper__list__element--head__username'>
                  Pseudo
                </span>
                <span className='rank__wrapper__list__element--head__score'>
                  Score
                </span>
              </li>
              <div className={'rank__wrapper__list__element__wrapper'}>
                {rank[0] &&
                  rank.map((player: any, index: any) => (
                    <li key={index} className='rank__wrapper__list__element'>
                      <span
                        className={
                          player.username === context.username
                            ? 'rank__wrapper__list__element__rank rank__wrapper__list__element__actualPlayer'
                            : 'rank__wrapper__list__element__rank'
                        }
                      >
                        #{player.rank}
                      </span>
                      <span
                        className={
                          player.username === context.username
                            ? 'rank__wrapper__list__element__username rank__wrapper__list__element__actualPlayer'
                            : 'rank__wrapper__list__element__username'
                        }
                      >
                        {player.username}
                      </span>
                      <span
                        className={
                          player.username === context.username
                            ? 'rank__wrapper__list__element__score rank__wrapper__list__element__actualPlayer'
                            : 'rank__wrapper__list__element__score'
                        }
                      >
                        {player.score}
                      </span>
                    </li>
                  ))}
              </div>
            </ul>
          </div>
          <Link className='rank__button button' to='/'>
            Retourner au menu principal
          </Link>
        </>
      )}
    </div>
  );
};

export default Rank;
