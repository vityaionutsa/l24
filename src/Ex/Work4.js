import React, { useState } from 'react';

const questions = [
  {
    question: 'Яка столиця Франції?',
    answers: [
      { text: 'Лондон', isCorrect: false },
      { text: 'Париж', isCorrect: true },
      { text: 'Мадрид', isCorrect: false },
      { text: 'Ірак', isCorrect: false },
    ],
  },
  {
    question: 'Який найбільший планета в Сонячній системі?',
    answers: [
      { text: 'Юпітер', isCorrect: true },
      { text: 'Сатурн', isCorrect: false },
      { text: 'Марс', isCorrect: false },
      { text: 'Земля', isCorrect: false },
    ],
  },
  {
    question: 'Який найвища гора в світі?',
    answers: [
      { text: 'Кіліманджаро', isCorrect: false },
      { text: 'Еверест', isCorrect: true },
      { text: 'Фудзі', isCorrect: false },
      { text: 'Говерла', isCorrect: false },
    ],
  },
  {
    question: 'Яка валюта в Японії?',
    answers: [
      { text: 'Єна', isCorrect: true },
      { text: 'Євро', isCorrect: false },
      { text: 'Долар', isCorrect: false },
      { text: 'Гривня', isCorrect: false },
    ],
  },
  {
    question: 'Як називається найдовша ріка в Африці?',
    answers: [
      { text: 'Ніл', isCorrect: true },
      { text: 'Конґо', isCorrect: false },
      { text: 'Замбезі', isCorrect: false },
      { text: 'Дніпро', isCorrect: false },
    ],
  },
];

const Question = ({ question, answers, currentAnswer, onChangeAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            type="radio"
            name="answer"
            id={answer.text}
            value={answer.text}
            checked={currentAnswer === answer.text}
            onChange={(e) => onChangeAnswer(e.target.value)}
          />
          <label htmlFor={answer.text}>{answer.text}</label>
        </div>
      ))}
    </div>
  );
};

const Work4 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1));
  };

  const handleChangeAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].answers.find((a) => a.isCorrect)?.isCorrect
    );
    
    return (
    <div>
    <Question
         question={questions[currentQuestionIndex].question}
         answers={questions[currentQuestionIndex].answers}
         currentAnswer={answers[currentQuestionIndex]}
         onChangeAnswer={handleChangeAnswer}
       />
    <div>
    <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
    Назад
    </button>
    <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
    Вперед
    </button>
    </div>
    {showResults ? (
    <div>
    <h2>Результати</h2>
    <p>Кількість правильних відповідей: {correctAnswers.length} з {questions.length}</p>
    <ul>
    {questions.map((question, index) => (
    <li key={index}>
    {question.question} -{' '}
    {answers[index] === question.answers.find((a) => a.isCorrect)?.text ? 'Правильно' : 'Неправильно'}
    </li>
    ))}
    </ul>
    </div>
    ) : (
    <button onClick={handleCheckAnswers}>Перевірити відповіді</button>
    )}
    </div>
    );
    };
    
    export default Work4;
