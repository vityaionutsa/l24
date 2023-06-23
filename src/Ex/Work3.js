import React, { useState } from 'react';

const questions = [
  {
  question: 'Яка столиця Франції?',
  answers: ['Лондон', 'Париж', 'Мадрид'],
  correctAnswer: 'Париж',
  },
  {
  question: 'Який найбільший планета в Сонячній системі?',
  answers: ['Юпітер', 'Сатурн', 'Марс'],
  correctAnswer: 'Юпітер',
  },
  {
  question: 'Який найвища гора в світі?',
  answers: ['Гора Кіліманджаро', 'Гора Еверест', 'Гора Фудзі'],
  correctAnswer: 'Гора Еверест',
  },
  {
  question: 'Яка валюта в Японії?',
  answers: ['Єна', 'Євро', 'Долар'],
  correctAnswer: 'Єна',
  },
  {
  question: 'Як називається найдовша ріка в Африці?',
  answers: ['Ніл', 'Конґо', 'Замбезі'],
  correctAnswer: 'Ніл',
  },
  ];

const Question = ({ question, answers, currentAnswer, onChangeAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      {answers.map(answer => (
        <div key={answer}>
          <input
            type="radio"
            name="answer"
            id={answer}
            value={answer}
            checked={currentAnswer === answer}
            onChange={e => onChangeAnswer(e.target.value)}
          />
          <label htmlFor={answer}>{answer}</label>
        </div>
      ))}
    </div>
  );
};

const Work3 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1));
  };

  const handleChangeAnswer = answer => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer,
  );

  return (
    <div>
      {!showResults && (
        <>
          <Question
            question={questions[currentQuestionIndex].question}
            answers={questions[currentQuestionIndex].answers}
            currentAnswer={answers[currentQuestionIndex]}
            onChangeAnswer={handleChangeAnswer}
          />
          <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
            Попередня
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Далі
          </button>
          {answers.length === questions.length && (
            <button onClick={handleCheckAnswers}>Перевірте відповіді</button>
          )}
        </>
      )}
      {showResults && (
        <div>
          {questions.map((question, index) => {
            const answer = answers[index];
            const isCorrect = answer === question.correctAnswer;
            return (
            <div key={index} style={{ color: isCorrect ? 'green' : 'red' }}>
            <p>{question.question}</p>
            <p>Ваша відповідь: {answer}</p>
            {isCorrect ? (
            <p>Правильно!</p>
            ) : (
            <p>Невірно, правильна відповідь:{question.correctAnswer}</p>
            )}
            </div>
            );
            })}
            </div>
            )}
            </div>
            );
            };
            
            export default Work3;
