import React, { useState } from "react"
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  submitUserAnswers,
  setUserAnswers,
  UserAnswers,
} from "../../features/quizes/quizSlice"
import Timer from "../Timer"

const Quiz = ({ questions }) => {
  const dispatch = useAppDispatch()
  const quizId = useAppSelector((state) => state.quiz.quizId)
  const timeToSolve = useAppSelector((state) => state.quiz.timeToSolve)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<UserAnswers>({})
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerChange = (answerId: string) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [currentQuestion._id]: [
        ...(prevSelectedAnswers[currentQuestion._id] || []),
        answerId,
      ],
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = () => {
    const allQuestionsAnswered = questions.every(
      (question) => (selectedAnswers[question._id] || []).length > 0,
    )

    if (allQuestionsAnswered) {
      // Dispatch action to submit user answers
      dispatch(
        submitUserAnswers({
          quizId,
          userAnswers: selectedAnswers,
        }),
      )
      dispatch(setUserAnswers(selectedAnswers))
      setIsQuizSubmitted(true)
    } else {
      alert("Please answer all questions before submitting.")
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Question {currentQuestionIndex + 1}
        </Typography>
        <Typography variant="body1">{currentQuestion?.text}</Typography>
        <FormControl component="fieldset">
          {currentQuestion?.answers.map((answer) => (
            <FormControlLabel
              key={answer._id}
              control={
                <Checkbox
                  checked={(
                    selectedAnswers[currentQuestion._id] || []
                  ).includes(answer._id)}
                  onChange={() => handleAnswerChange(answer._id)}
                />
              }
              label={answer.answerText}
            />
          ))}
        </FormControl>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous Question
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next Question
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitQuiz}
            disabled={isQuizSubmitted}
          >
            Submit Quiz
          </Button>
        </div>
        <Divider />
        <Timer initialSeconds={timeToSolve * 60}></Timer>
      </CardContent>
    </Card>
  )
}

export default Quiz
