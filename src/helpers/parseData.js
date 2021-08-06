import { decode } from "he";

// Paso de HTML a texto plano algunas variables de los objetos obtenido de la API
const parseData = (data) => {
  return data.map((d) => {
    return {
      ...d,
      question: decode(d.question),
      correct_answer: decode(d.correct_answer),
      incorrect_answers: d.incorrect_answers.map((a) => decode(a)),
    };
  });
};

export default parseData;
