import { useState } from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но c возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({ correctAnswers, setStep, setCorrectAnswers }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>{`Вы отгадали ${correctAnswers} ответа из ${questions.length}`} </h2>
      <button
        onClick={() => {
          setStep(0);
          setCorrectAnswers(0);
        }}>
        Попробовать снова
      </button>
    </div>
  );
}

function Game({ question, onClickVariant, step }) {
  const percentage = Math.round((step / questions.length) * 100);
  console.log(percentage);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((variant, index) => (
          <li key={variant} onClick={() => onClickVariant(index)}>
            {variant}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const question = questions[step];
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const onClickVariant = (index) => {
    if (index === question.correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setStep(step + 1);
  };

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} />
      ) : (
        <Result
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default App;
