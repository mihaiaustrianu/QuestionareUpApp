import React, { useEffect, useState } from "react"
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

const Quiz = ({ questions, initialSelectedAnswers }) => {
  const dispatch = useAppDispatch()
  const quizId = useAppSelector((state) => state.quiz.quizId)
  const timeToSolve = useAppSelector((state) => state.quiz.timeToSolve)
  const endTime = useAppSelector((state) => state.quiz.endTime)

  useEffect(() => {
    setSelectedAnswers(initialSelectedAnswers || {})
  }, [initialSelectedAnswers])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<UserAnswers>({})
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerChange = (answerId: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const currentQuestionId = currentQuestion?._id
      const selectedAnswersForQuestion =
        prevSelectedAnswers[currentQuestionId] || []

      // Check if the answerId is already selected
      if (selectedAnswersForQuestion.includes(answerId)) {
        // If it's selected, remove it
        const updatedAnswers = selectedAnswersForQuestion.filter(
          (id) => id !== answerId,
        )
        return {
          ...prevSelectedAnswers,
          [currentQuestionId]: updatedAnswers,
        }
      } else {
        // If it's not selected, add it
        return {
          ...prevSelectedAnswers,
          [currentQuestionId]: [...selectedAnswersForQuestion, answerId],
        }
      }
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
    dispatch(setUserAnswers(selectedAnswers))
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      dispatch(setUserAnswers(selectedAnswers))
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
        <Timer endTime={endTime} initialSeconds={timeToSolve * 60}></Timer>
      </CardContent>
    </Card>
  )
}

export default Quiz
