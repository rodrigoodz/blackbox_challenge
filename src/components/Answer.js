import React from "react";

const Answer = ({ text, onAnswerClick }) => {
  return (
    <button
      type="button"
      onClick={() => onAnswerClick(text)}
      className="p-2 m-2 font-bold text-white border-4 border-blue-900 rounded-2xl hover:bg-blue-700 hover:text-2xl"
    >
      {text}
    </button>
  );
};

export default Answer;
