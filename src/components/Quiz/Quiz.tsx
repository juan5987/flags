import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getRandomNumber } from '../../utils/randomInt';
import { normalizeString } from '../../utils/normalizeString';
import { UserContext } from '../App/App';
import Footer from '../Footer/Footer';
import check from '../../static/images/check.svg';
import Login from '../Login/Login';
import chevron_right from '../../static/images/chevron-right.svg';
import './quiz.sass';

const Quiz = () => {
  const [allCountries, setAllCountries]: any = useState();
  const [currentFlag, setCurrentFlag] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [solution, setSolution] = useState<string>();
  const inputRef: any = useRef([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [intervalId, setIntervalId] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notLoggedModalOpened, setNotLoggedModalOpened] = useState(true);
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [previousSolution, setPreviousSolution]: any = useState([]);
  const context: any = useContext(UserContext);

  useEffect(() => {
    if (!isLoading) {
      const newIntervalId: any = setInterval(() => {
        setTimer((timer) => timer - 0.01);
      }, 10);
      setIntervalId(newIntervalId);
      return () => clearInterval(newIntervalId);
    }
  }, [isLoading]);

  useEffect(() => {
    if (Math.round(timer) === 0) {
      clearInterval(intervalId);
      setGameOver(true);
      setPreviousSolution([]);
      if (context.bestScore < score) {
        if (context.isLogged) {
          const requestOptions: any = {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
              newScore: score,
              userId: context.userId,
            }),
            url: `${context.apiUrl}/updatescore`,
          };
          axios(requestOptions)
            .then((result: any) => {
              context.setBestScore(score);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  }, [timer]);

  useEffect(() => {
    if (!notLoggedModalOpened && !isLoginModalOpened) {
      axios('https://restcountries.com/v2/all')
        .then((result) => {
          let actualCountries = result.data.filter(
            (country: any) => country.independent === true
          );
          setAllCountries(actualCountries);
          const randomInt = getRandomNumber(1, 202);
          setCurrentFlag(actualCountries[randomInt].flag);
          setSolution(actualCountries[randomInt].translations.fr);
          setPreviousSolution([
            ...previousSolution,
            actualCountries[randomInt].translations.fr,
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [notLoggedModalOpened, isLoginModalOpened]);

  useEffect(() => {
    setIsLoading(true);
    if (context.isLogged) {
      setNotLoggedModalOpened(false);
    } else {
      setNotLoggedModalOpened(true);
    }
  }, []);

  const handlePass = () => {
    setResult(false);
    if (score > 0) {
      setScore((score) => score - 1);
    }
    setShowResult(true);
    clearInterval(intervalId);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (answer) {
      if (normalizeString(answer) === normalizeString(solution)) {
        setResult(true);
        setScore((score) => score + 3);
        clearInterval(intervalId);
      } else {
        if (score > 0) {
          setScore((score) => score - 1);
        }
        clearInterval(intervalId);
        setResult(false);
      }
      setShowResult(true);
    }
    e.target.blur();
  };

  const handleNextFlag = () => {
    setShowResult(false);
    let randomNumber = getRandomNumber(1, 202);
    previousSolution.forEach((previousSolution: any) => {
      while (previousSolution === allCountries[randomNumber].translations.fr) {
        randomNumber = getRandomNumber(1, 202);
      }
    });
    setCurrentFlag(allCountries[randomNumber].flag);
    setSolution(allCountries[randomNumber].translations.fr);
    setAnswer('');
    setPreviousSolution([
      ...previousSolution,
      allCountries[randomNumber].translations.fr,
    ]);
    const newIntervalId: any = setInterval(() => {
      setTimer((timer) => timer - 0.01);
    }, 10);
    setIntervalId(newIntervalId);
    console.log(previousSolution);
  };

  const handlePlayAgain = () => {
    setTimer(60);
    setGameOver(false);
    setScore(0);
    handleNextFlag();
    const newIntervalId: any = setInterval(() => {
      setTimer((timer) => timer - 0.01);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handleLogin = () => {
    setIsLoginModalOpened(true);
    setNotLoggedModalOpened(false);
  };

  return (
    <div className='quiz'>
      <div className='quiz__background'></div>
      {isLoginModalOpened && <Login displayFunction={setIsLoginModalOpened} />}
      {notLoggedModalOpened && (
        <div className='quiz__modal'>
          <div className='quiz__modal__content'>
            <h2 className='quiz__modal__content__title'>Avertissement</h2>
            <p className='quiz__modal__content__paragraph'>
              Vous jouez en tant qu'invité. Votre score ne sera pas sauvegardé.
            </p>
            <p className='quiz__modal__content__paragraph'>
              Pour sauvegarder votre score et apparaitre dans le classement,
              vous devez vous authentifier.
            </p>
            <div className='quiz__modal__content__buttons'>
              <button
                className='quiz__modal__content__buttons__button'
                onClick={handleLogin}
              >
                Connexion
              </button>
              <button
                className='quiz__modal__content__buttons__button'
                onClick={() => setNotLoggedModalOpened(false)}
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <h2 className='quiz__top__loading'>Chargement de la partie...</h2>
      ) : (
        <>
          <div className='quiz__mobile'>
            <div className='quiz__mobile__score'>
              <h2 className='quiz__mobile__score__label'>Score</h2>
              <span className='quiz__mobile__score__value'>{score}</span>
            </div>
            <div className='quiz__mobile__timer'>
              <h2 className='quiz__mobile__timer__label'>Temps restant</h2>
              <span className='quiz__mobile__timer__value'>
                {Math.round(timer)}
              </span>
            </div>
          </div>
          <div className='quiz__top'>
            <div className='quiz__top__left'>
              <h2 className='quiz__top_title'>Score</h2>
              <span className='quiz__top__score'>{score}</span>
            </div>
            <div>
              <Link className='quiz__quit' to='/'>
                quitter
              </Link>

              <img
                className='quiz__top__flag'
                src={currentFlag}
                alt='drapeau'
                height={300}
              />
            </div>
            <div className='quiz__top__right'>
              <h2 className='quiz__top_title'>Temps restant</h2>
              <span className='quiz__top__score'>{Math.round(timer)}</span>
            </div>
          </div>

          <form className='quiz__answer' onSubmit={handleSubmit}>
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
              <button className='quiz__buttons__button' onClick={handlePass}>
                Passer
              </button>
              <button className='quiz__buttons__button'>Valider</button>
            </div>
          </form>
          {showResult && (
            <div className='quiz__result'>
              <div className='quiz__result__content'>
                {result && (
                  <>
                    <img
                      className='quiz__result__content__check'
                      src={check}
                      alt='check logo'
                    />
                    <h3 className='quiz__result__content__correct'>
                      Félicitations !
                    </h3>
                    <span className='quiz__result__content__text'>
                      La réponse est:
                    </span>
                  </>
                )}
                {!result && (
                  <>
                    <div className='quiz__result__content__cross'>x</div>
                    <h3 className='quiz__result__content__incorrect'>
                      Dommage
                    </h3>
                    <span className='quiz__result__content__text'>
                      La réponse était:
                    </span>
                  </>
                )}
                <span className='quiz__result__content__solution'>
                  {solution}
                </span>
                <button
                  className='quiz__result__content__next'
                  onClick={handleNextFlag}
                >
                  Drapeau suivant
                  <img src={chevron_right} alt='chevron' />
                </button>
              </div>
            </div>
          )}
          {gameOver && (
            <div className='quiz__gameover'>
              <div className='quiz__gameover__content'>
                <h2 className='quiz__gameover__content__title'>
                  partie terminée
                </h2>
                <span className='quiz__gameover__content__score'>
                  Votre score est: {score}
                </span>
                <div className='quiz__gameover__content__buttons'>
                  <button
                    className='quiz__gameover__content__buttons__play'
                    onClick={handlePlayAgain}
                  >
                    Rejouer
                  </button>
                  <Link
                    className='quiz__gameover__content__buttons__quit'
                    to='/'
                  >
                    Quitter
                  </Link>
                </div>
              </div>
            </div>
          )}

          <Footer />
        </>
      )}
    </div>
  );
};

export default Quiz;
