import QuizMenu from "../../components/quizes/QuizMenu"
import Quiz from "../../components/quizes/Quiz"
import { useAppSelector } from "../../app/hooks"
import TopInfo from "../../components/TopInfo"

const QuizMenuPage = () => {
  const questions = useAppSelector((state) => state.quiz.questions)
  const userAnswers = useAppSelector((state) => state.quiz.userAnswers)
  const endTime = useAppSelector((state) => state.quiz.endTime)
  const isQuizActive = questions && endTime > Date.now()

  return isQuizActive ? (
    <>
      <TopInfo
        timer={true}
        title="Quiz in progress"
        arrowBack={false}
      ></TopInfo>
      <Quiz questions={questions} initialSelectedAnswers={userAnswers} />
    </>
  ) : (
    <QuizMenu />
  )
}

export default QuizMenuPage
