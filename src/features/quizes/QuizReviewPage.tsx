import React from "react"
import QuizResults from "../../components/quizes/QuizReview"
import { useAppSelector } from "../../app/hooks"

export default function QuizReviewPage() {
  const { questions, userAnswers, quizScore } = useAppSelector(
    (state) => state.reviewedQuiz,
  )
  return (
    <>
      <QuizResults
        questions={questions}
        userAnswers={userAnswers}
        score={quizScore}
      ></QuizResults>
    </>
  )
}
