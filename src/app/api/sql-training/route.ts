import { Parser } from "node-sql-parser";

interface SqlTrainingRequest {
  userAnswer: string;
  correctAnswer: string;
}

function isValidRequest(request: unknown): request is SqlTrainingRequest {
  return (
    typeof (request as SqlTrainingRequest).userAnswer === "string" &&
    typeof (request as SqlTrainingRequest).correctAnswer === "string"
  );
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!isValidRequest(data)) {
    return new Response("Nieprawidłowa wartość", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (data.userAnswer.length > 1000 || data.correctAnswer.length > 1000) {
    return new Response("Odpowiedź może mieć maksymalnie 1000 znaków", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const parser = new Parser();

  const { userAnswer, correctAnswer } = data;

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const parsedAnswer = parser.parse(
      userAnswer.charAt(userAnswer.length - 1) === ";"
        ? userAnswer.substring(0, userAnswer.indexOf(";"))
        : userAnswer
    );

    const parsedCorrectAnswer = parser.parse(correctAnswer);

    const isCorrect =
      JSON.stringify(parsedAnswer) === JSON.stringify(parsedCorrectAnswer);
    return new Response(isCorrect.toString(), {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (_error) {
    return new Response("false", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
