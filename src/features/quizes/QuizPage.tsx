import { useAppSelector } from "../../app/hooks"

import Quiz from "../../components/quizes/Quiz"

const QuizPage = () => {
  const questions = useAppSelector((state) => state.quiz.questions)
  return <Quiz questions={questions} />
}

export default QuizPage
