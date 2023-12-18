import React from "react"
import TopInfo from "../../components/common/TopInfo"
import QuizResults from "../../components/quizes/QuizReview"
import { useAppSelector } from "../../app/hooks"

export default function QuizReviewPage() {
  const { questions, userAnswers, quizScore } = useAppSelector(
    (state) => state.reviewedQuiz,
  )
  return (
    <>
      <TopInfo
        title="Quiz review"
        leftItem={{ type: "arrowBack" }}
        rightItem={{
          tooltip: `${quizScore} / ${questions.length}`,
          type: "score",
        }}
      ></TopInfo>
      <QuizResults
        questions={questions}
        userAnswers={userAnswers}
        score={quizScore}
      ></QuizResults>
    </>
  )
}
