import { useEffect, useState } from "react";
import parseData from "../helpers/parseData";

const useFetchQuestions = (timesPlayed) => {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("loading");
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then(({ results }) => {
        let questions = parseData(results);
        // Modifico los datos obtenido principalmente para juntar las respuestas
        let questionsModified = questions.map((q) => {
          return {
            question: q.question,
            category: q.category,
            difficulty: q.difficulty,
            answers: [
              { answer: q.correct_answer, correct: true, id: 0 },
              ...q.incorrect_answers.map((element, idx) => {
                return { answer: element, correct: false, id: idx + 1 };
              }),
            ].sort(() => 0.5 - Math.random()), //mezclo orden de las respuestas
          };
        });
        setQuestions(questionsModified);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
    return () => {};
  }, [timesPlayed]);

  return [questions, status];
};

export default useFetchQuestions;
