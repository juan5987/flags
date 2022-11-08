import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { getRandomNumber } from '../../utils/randomInt';
import Header from '../Header/Header';
import './quiz.sass';

const Quiz = () => {
  const [randomInt, setRandomInt] = useState(getRandomNumber(1, 250));
  const [currentFlag, setCurrentFlag] = useState<string>('');
  const [answer, setAnswer] = useState<[]>([]);
  const [solution, setSolution] = useState<[]>([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const inputRef: any = useRef([]);

  useEffect(() => {
    axios('https://restcountries.com/v2/all').then((result) => {
      let actualCountries = result.data.filter(
        (country: any) => country.independent === true
      );
      setCurrentFlag(actualCountries[randomInt].flag);
      setSolution(actualCountries[randomInt].translations.fr.split(''));
      inputRef.current[0].focus();
      console.log(actualCountries[randomInt].translations.fr);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.dataset.index) {
      const newAnswer: any = [...answer];
      newAnswer[parseInt(e.target.dataset.index)] = [e.target.value];
      setAnswer(newAnswer);
      console.log(answer);

      if (parseInt(e.target.dataset.index) < solution.length - 1) {
        if (inputRef.current[parseInt(e.target.dataset.index) + 1]) {
          if (
            inputRef.current[parseInt(e.target.dataset.index)].value === '' &&
            inputRef.current[parseInt(e.target.dataset.index) - 1]
          ) {
            inputRef.current[parseInt(e.target.dataset.index) - 1].focus();
            inputRef.current[parseInt(e.target.dataset.index) - 1].select();
          } else if (
            inputRef.current[parseInt(e.target.dataset.index)].value === '' &&
            inputRef.current[parseInt(e.target.dataset.index) - 2]
          ) {
            inputRef.current[parseInt(e.target.dataset.index) - 2].focus();
            inputRef.current[parseInt(e.target.dataset.index) - 2].select();
          } else if (
            parseInt(e.target.dataset.index) === 0 &&
            inputRef.current[parseInt(e.target.dataset.index)].value === ''
          ) {
            inputRef.current[parseInt(e.target.dataset.index)].focus();
            inputRef.current[parseInt(e.target.dataset.index)].select();
          } else {
            inputRef.current[parseInt(e.target.dataset.index) + 1].focus();
            inputRef.current[parseInt(e.target.dataset.index) + 1].select();
          }
        } else {
          if (
            inputRef.current[parseInt(e.target.dataset.index)].value === '' &&
            inputRef.current[parseInt(e.target.dataset.index) - 1]
          ) {
            inputRef.current[parseInt(e.target.dataset.index) - 1].focus();
            inputRef.current[parseInt(e.target.dataset.index) - 1].select();
          } else {
            inputRef.current[parseInt(e.target.dataset.index) + 2].focus();
            inputRef.current[parseInt(e.target.dataset.index) + 2].select();
          }
        }
      } else {
        if (
          parseInt(e.target.dataset.index) === solution.length - 1 &&
          inputRef.current[parseInt(e.target.dataset.index)].value === ''
        ) {
          inputRef.current[parseInt(e.target.dataset.index) - 1].focus();
          inputRef.current[parseInt(e.target.dataset.index) - 1].select();
        }
      }
    }
  };

  return (
    <div className='quiz'>
      <img
        className='quiz__flag'
        src={currentFlag}
        alt='drapeau'
        width={800}
        height={'auto'}
      />
      <div className='quiz__answer'>
        {solution &&
          solution.map((letter, index) =>
            letter !== ' ' && letter !== '-' ? (
              <input
                key={index}
                onChange={handleInputChange}
                className='quiz__answer__letter'
                type='text'
                ref={(element) => (inputRef.current[index] = element)}
                maxLength={1}
                data-index={index}
                onClick={(e: any) => e.target.select()}
              />
            ) : (
              <div
                key={index}
                className={
                  letter === ' '
                    ? 'quiz__answer__space'
                    : 'quiz__answer__letter'
                }
              >
                {letter === '-' ? letter : ''}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Quiz;
