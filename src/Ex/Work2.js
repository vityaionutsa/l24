import React, { useState } from "react";

const questions = [
"Яка столиця Іспанії?",
"Яка найвища гора Африки?",
"Яка найменша країна в світі?",
"Яка найбільш густонаселена країна в світі?",
"Яка найбільша пустеля в світі?",
];

const answers = [
["Мадрид", "Барселона", "Севілья", "Валенсія"],
["Кіліманджаро", "Еверест", "Фудзі", "Ельбрус"],
["Ватикан", "Монако", "Сан-Марино", "Науру"],
["Китай", "Індія", "Сполучені Штати", "Індонезія"],
["Сахара", "Арктика", "Антарктида", "Гобі"],
];

const correctAnswers = ["Мадрид", "Кіліманджаро", "Сан-Марино", "Китай", "Сахара"];

function Work2() {
const [inputAnswers, setInputAnswers] = useState(
new Array(questions.length).fill("")
);
const [showResults, setShowResults] = useState(false);

function handleAnswerInput(index, event) {
const newInputAnswers = [...inputAnswers];
newInputAnswers[index] = event.target.value;
setInputAnswers(newInputAnswers);
}

function handleSubmit() {
setShowResults(true);
}

return (
<div>
{questions.map((question, index) => (
<div key={index}>
<p>{question}</p>
{showResults ? (
inputAnswers[index] === correctAnswers[index] ? (
<p style={{ color: "green" }}>Ваша відповідь правильна.</p>
) : (
<p style={{ color: "red" }}>
Ваша відповідь невірна. Правильна відповідь{" "}
{correctAnswers[index]}.
</p>
)
) : (<input
  type="text"
  value={inputAnswers[index]}
  onChange={(event) => handleAnswerInput(index, event)}
  />
  )}
  
  </div>
  ))}
  <button onClick={handleSubmit}>Перевірити</button>
  </div>
  );
  }
  export default Work2;