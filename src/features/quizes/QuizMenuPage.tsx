import QuizMenu from "../../components/quizes/QuizMenu"
import Quiz from "../../components/quizes/Quiz"
import { useAppSelector } from "../../app/hooks"

const QuizMenuPage = () => {
  const questions = useAppSelector((state) => state.quiz.currentQuiz.questions)
  const userAnswers = useAppSelector(
    (state) => state.quiz.currentQuiz.userAnswers,
  )
  const endTime = useAppSelector((state) => state.quiz.currentQuiz.endTime)
  const isQuizActive = questions && endTime > Date.now()

  return isQuizActive ? (
    <>
      <Quiz questions={questions} initialSelectedAnswers={userAnswers} />
    </>
  ) : (
    <QuizMenu />
  )
}

export default QuizMenuPage
