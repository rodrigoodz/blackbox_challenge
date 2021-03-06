import React, { useState } from "react";
import Answer from "./Answer";

const Question = ({ questionInfo, onCorrectAnswer }) => {
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const { category, difficulty, answers, question } = questionInfo;

  const handleClick = (text) => {
    setShowCorrectAnswer(true);
    setTimeout(() => {
      setShowCorrectAnswer(false);
      // Busco texto de la respuesta correcta en el array
      const { answer: correctAnswer } = answers.find(
        (answer) => answer.correct === true
      );
      //  veo si matchea con lo clickeado
      if (correctAnswer === text) {
        if (answers.length === 4) {
          // Si es multiplechoice sumo 10;sino 5
          onCorrectAnswer(10);
        } else {
          onCorrectAnswer(5);
        }
      } else {
        // No le paso puntaje si no es correcta pero si avanzo la pregunta
        onCorrectAnswer(0);
      }
    }, 1000);
  };

  return (
    <div className="w-10/12 shadow-2xl question_color rounded-2xl">
      <div className="relative text-gray-100">
        <p className="pt-5 font-light text-center">{category}</p>
        <p
          className={`absolute top-0 right-0 px-2 rounded-tr-2xl rounded-bl-xl text-white  ${
            difficulty === "hard"
              ? "bg-red-600"
              : difficulty === "medium"
              ? "bg-yellow-600"
              : "bg-green-600"
          }  `}
        >
          {difficulty}
        </p>
      </div>
      <div className="p-5">
        <h1 className="text-2xl text-center text-white pointer-events-none ">
          {question}
        </h1>
        <div className="flex flex-col p-2">
          {answers.map((answer) => {
            return (
              <Answer
                text={answer.answer}
                isCorrect={answer.correct}
                showCorrectAnswer={showCorrectAnswer}
                key={answer.id}
                onAnswerClick={handleClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
