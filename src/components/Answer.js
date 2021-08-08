import React from "react";

const Answer = ({ text, isCorrect, showCorrectAnswer, onAnswerClick }) => {
  const handleClick = () => {
    onAnswerClick(text);
  };

  if (showCorrectAnswer) {
    return (
      <button
        type="button"
        disabled
        onClick={() => onAnswerClick(text)}
        className="relative flex p-2 m-2 font-bold text-white transition duration-500 border-4 border-blue-900 rounded-2xl "
      >
        <p className="flex-1">{text}</p>
        {isCorrect ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 self-center w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="green"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 self-center w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex p-2 m-2 font-bold text-white transition duration-500 border-4 border-blue-900 rounded-2xl md:hover:bg-indigo-700 "
    >
      <p className="flex-1 ">{text}</p>
    </button>
  );
};

export default Answer;
