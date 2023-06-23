import React, { useState } from 'react';

const questions = [
  {
    question: 'Які кольори є в прапорі України?',
    answers: [
      { text: 'Синій', isCorrect: true },
      { text: 'Жовтий', isCorrect: true },
      { text: 'Червоний', isCorrect: false },
      { text: 'Зелений', isCorrect: false },
    ],
  },
  {
    question: 'Які планети Сонячної системи мають кільця?',
    answers: [
      { text: 'Юпітер', isCorrect: false },
      { text: 'Сатурн', isCorrect: true },
      { text: 'Уран', isCorrect: true },
      { text: 'Марс', isCorrect: false },
    ],
  },
  {
    question: 'Які кольори є в прапорі США?',
    answers: [
      { text: 'Синій', isCorrect: true },
      { text: 'Червоний', isCorrect: true },
      { text: 'Білий', isCorrect: true },
      { text: 'Жовтий', isCorrect: false },
    ],
  },
  {
    question: 'Які кольори є в прапорі Німеччини?',
    answers: [
      { text: 'Чорний', isCorrect: false },
      { text: 'Червоний', isCorrect: true },
      { text: 'Жовтий', isCorrect: true },
      { text: 'Зелений', isCorrect: false },
    ],
  },
  {
    question: 'Які кольори є в прапорі Росії?',
    answers: [
      { text: 'Синій', isCorrect: false },
      { text: 'Червоний', isCorrect: true },
      { text: 'Білий', isCorrect: true },
      { text: 'Зелений', isCorrect: false },
    ],
  },
];


const Question = ({ question, answers, currentAnswers, onChangeAnswers }) => {
  return (
    <div>
      <h2>{question}</h2>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            type="checkbox"
            name="answer"
            id={answer.text}
            value={answer.text}
            checked={currentAnswers.includes(answer.text)}
            onChange={(e) => {
              if (e.target.checked) {
                onChangeAnswers([...currentAnswers, e.target.value]);
              } else {
                onChangeAnswers(currentAnswers.filter((a) => a !== e.target.value));
              }
            }}
          />
          <label htmlFor={answer.text}>{answer.text}</label>
        </div>
      ))}
    </div>
  );
};

const Work5 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill([]));
  const [showResults, setShowResults] = useState(false);

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1));
  };
  
  const handleNextQuestion = () => {
  setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1));
  };
  
  const handleFinishQuiz = () => {
  setShowResults(true);
  };
  
  const handleRestartQuiz = () => {
  setCurrentQuestionIndex(0);
  setAnswers(Array(questions.length).fill([]));
  setShowResults(false);
  };
  
  const handleAnswerChange = (index, selectedAnswers) => {
  const newAnswers = [...answers];
  newAnswers[index] = selectedAnswers;
  setAnswers(newAnswers);
  };
  
  const getScore = () => {
  let score = 0;
  answers.forEach((questionAnswers, index) => {
  const correctAnswers = questions[index].answers.filter((answer) => answer.isCorrect).map((answer) => answer.text);
  if (questionAnswers.length === correctAnswers.length && questionAnswers.every((answer) => correctAnswers.includes(answer))) {
  score++;
  }
  });
  return score;
  };
  
  return (
  <div>
  {showResults ? (
  <div>
  <h2>Ваш результат: {getScore()} з {questions.length}</h2>
  <button onClick={handleRestartQuiz}>Почати знову</button>
  </div>
  ) : (
  <div>
  <Question
  question={questions[currentQuestionIndex].question}
  answers={questions[currentQuestionIndex].answers}
  currentAnswers={answers[currentQuestionIndex]}
  onChangeAnswers={(selectedAnswers) => handleAnswerChange(currentQuestionIndex, selectedAnswers)}
  />
  <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
  Попереднє запитання
  </button>
  <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
  Наступне запитання
  </button>
  {currentQuestionIndex === questions.length - 1 && (
  <button onClick={handleFinishQuiz} disabled={answers[currentQuestionIndex].length === 0}>
  Закінчити тестування
  </button>
  )}
  </div>
  )}
  </div>
  );
  };
  
  export default Work5;
