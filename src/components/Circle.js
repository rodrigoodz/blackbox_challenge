import React from "react";

const Circle = ({ fill }) => {
  return (
    <svg height="20" width="20">
      <circle
        cx="10"
        cy="10"
        r="6"
        stroke="black"
        strokeWidth="1"
        fill={fill ? "#4338CA" : "none"}
      />
    </svg>
  );
};

export default Circle;
