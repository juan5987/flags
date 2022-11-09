import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { getRandomNumber } from '../../utils/randomInt';
import Header from '../Header/Header';
import './quiz.sass';

const Quiz = () => {
  const [allCountries, setAllCountries]: any = useState();
  const [randomInt, setRandomInt] = useState(getRandomNumber(1, 202));
  const [currentFlag, setCurrentFlag] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [solution, setSolution] = useState<string>();
  const inputRef: any = useRef([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(false);

  useEffect(() => {
    axios('https://restcountries.com/v2/all').then((result) => {
      let actualCountries = result.data.filter(
        (country: any) => country.independent === true
      );
      setAllCountries(actualCountries);
      setCurrentFlag(actualCountries[randomInt].flag);
      setSolution(actualCountries[randomInt].translations.fr);
      inputRef.current.focus();
    });
  }, []);

  const handlePass = () => {
    setResult(false);
    setShowResult(true);
  };

  const handleSubmit = () => {
    if (answer) {
      if (answer?.toLowerCase() === solution?.toLowerCase()) {
        setResult(true);
      } else {
        setResult(false);
      }
      setShowResult(true);
    }
  };

  const handleNextFlag = () => {
    setShowResult(false);
    const randomNumber = getRandomNumber(1, 202);
    setCurrentFlag(allCountries[randomNumber].flag);
    setSolution(allCountries[randomNumber].translations.fr);
    inputRef.current.focus();
    setAnswer('');
  };

  return (
    <div className='quiz'>
      <img
        className='quiz__flag'
        src={currentFlag}
        alt='drapeau'
        width={600}
        height={'auto'}
      />
      <div className='quiz__answer'>
        {
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnswer(e.target.value)
            }
            className='quiz__answer__letter'
            type='text'
            ref={inputRef}
            placeholder='Réponse'
            value={answer}
          />
        }
        <div className='quiz__buttons'>
          <button className='quiz__buttons__pass' onClick={handlePass}>
            Passer
          </button>
          <button className='quiz__buttons__submit' onClick={handleSubmit}>
            Valider
          </button>
        </div>
      </div>
      {showResult && (
        <div className='quiz__result'>
          <div className='quiz__result__content'>
            {result && (
              <h3 className='quiz__result__content__correct'>Bonne réponse</h3>
            )}{' '}
            {!result && (
              <h3 className='quiz__result__content__incorrect'>
                Mauvaise réponse
              </h3>
            )}
            <span className='quiz__result__content__solution'>{solution}</span>
            <button
              className='quiz__result__content__next'
              onClick={handleNextFlag}
            >
              Drapeau suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
