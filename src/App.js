import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Question from "./components/Question";
import QuestionIndex from "./components/QuestionIndex";
import parseData from "./helpers/parseData";

function App() {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [qControl, setQControl] = useState({ currentQ: 0, score: 0 });
  const [timesPlayed, setTimesPlayed] = useState(0);

  useEffect(() => {
    setStatus("loading");
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then(({ results }) => {
        setStatus("completed");
        setQuestions(parseData(results));
        //TODO aca deberia hacer el mezclado de las respuesta directamente
      })
      .catch(() => {
        setStatus("error");
      });
    return () => {};
  }, [timesPlayed]);

  const handleCorrectAnswer = (score) => {
    setQControl({
      currentQ: qControl.currentQ + 1,
      score: qControl.score + score,
    });
  };

  const handleRetry = () => {
    setQuestions([]);
    setQControl({
      currentQ: 0,
      score: 0,
    });
    setTimesPlayed(timesPlayed + 1);
  };

  // TODO loading y error podria juntarlos cuando status!=="idle" y en base a eso mostrar un mensaje en rojo o blanco
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-500 select-none">
        <div className="flex items-center justify-center w-4/6 md:w-6/12 question_color h-2/4 rounded-2xl">
          <h1 className="text-2xl font-bold text-white">Loading...</h1>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-500 select-none">
        <div className="flex items-center justify-center w-4/6 md:w-6/12 question_color h-2/4 rounded-2xl">
          <h1 className="text-2xl font-bold text-red-500">
            There was an error...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen select-none bg_color">
      {questions.length > 0 && qControl.currentQ < 10 ? (
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
