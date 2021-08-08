import React from "react";

const StatusMessage = ({ message, status }) => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-500 select-none">
        <div className="flex items-center justify-center w-4/6 md:w-6/12 question_color h-2/4 rounded-2xl">
          <h1
            className={`text-2xl font-bold ${
              status === "error" ? "text-red-500" : "text-white"
            }`}
          >
            {message}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StatusMessage;
