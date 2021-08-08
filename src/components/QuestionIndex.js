import React from "react";
import Circle from "./Circle";

const QuestionIndex = ({ index }) => {
  const indexArr = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  indexArr[index] = true;

  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center mb-0 md:mb-5">
      {indexArr.map((a, idx) => {
        return <Circle key={idx} fill={a} />;
      })}
    </div>
  );
};

export default QuestionIndex;
