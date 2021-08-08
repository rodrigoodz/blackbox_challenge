import { motion } from "framer-motion";
import { useState } from "react";
import Question from "./components/Question";
import QuestionIndex from "./components/QuestionIndex";
import StatusMessage from "./components/StatusMessage";
import useFetchQuestions from "./hooks/useFetchQuestions";

function App() {
  const [qControl, setQControl] = useState({ currentQ: 0, score: 0 });
  const [timesPlayed, setTimesPlayed] = useState(0);
  const [questions, status] = useFetchQuestions(timesPlayed);

  const handleCorrectAnswer = (score) => {
    setQControl({
      currentQ: qControl.currentQ + 1,
      score: qControl.score + score,
    });
  };

  const handleRetry = () => {
    setQControl({
      currentQ: 0,
      score: 0,
    });
    setTimesPlayed(timesPlayed + 1);
  };

  if (status === "loading") {
    return <StatusMessage message="Loading..." status={status} />;
  }

  if (status === "error") {
    return <StatusMessage message="There was an error..." status={status} />;
  }

  return (
    <div className="flex items-center justify-center h-screen select-none bg_color">
      {status === "success" && qControl.currentQ < 9 ? (
        <div className="flex justify-center w-10/12">
          <Question
            questionInfo={questions[qControl.currentQ]}
            onCorrectAnswer={handleCorrectAnswer}
          />
          <QuestionIndex index={qControl.currentQ} />
        </div>
      ) : (
        <motion.div
          animate={{ y: -20 }}
          initial={{ y: 0 }}
          transition={{
            y: {
              duration: 0.4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeOut",
            },
          }}
          className="flex flex-col items-center justify-around w-4/6 text-white shadow-2xl md:w-2/6 h-2/6 question_color rounded-2xl"
        >
          <h1 className="text-2xl select-none sm:text-4xl md:text-5xl lg:text-7xl">
            Score: {qControl.score}
          </h1>
          <div className="text-center">
            <p>Times Played: {timesPlayed + 1}</p>
            <button
              className="mt-5 font-bold text-blue-400 "
              type="button"
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
