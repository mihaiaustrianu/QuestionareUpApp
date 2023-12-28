import QuizMenu from "../../components/quizes/QuizMenu"
import Quiz from "../../components/quizes/Quiz"
import { useAppSelector } from "../../app/hooks"
import Spinner from "../../components/common/Spinner"

const QuizMenuPage = () => {
  const questions = useAppSelector((state) => state.quiz.currentQuiz.questions)
  const userAnswers = useAppSelector(
    (state) => state.quiz.currentQuiz.userAnswers,
  )
  const loadingState = useAppSelector((state) => state.quiz.status)
  const endTime = useAppSelector((state) => state.quiz.currentQuiz.endTime)
  const isQuizActive = questions && endTime > Date.now()

  return (
    <>
      {loadingState === "loading" ? (
        <Spinner />
      ) : isQuizActive ? (
        <Quiz questions={questions} initialSelectedAnswers={userAnswers} />
      ) : (
        <QuizMenu />
      )}
    </>
  )
}

export default QuizMenuPage
