import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  FormControl,
  Grid,
  Pagination,
  Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  submitUserAnswers,
  setUserAnswers,
  UserAnswers,
  resetQuiz,
} from "../../features/quizes/quizSlice"
import StyledCheckbox from "./StyledCheckbox"
import { fetchQuiz } from "../../features/quizes/quizReviewSlice"
import { useNavigate } from "react-router-dom"
import TopInfo from "../common/TopInfo"
import ConfirmationModal from "../common/ConfirmationModal"
import useConfirmationModal from "../../app/useConfirmationModal"

const Quiz = ({ questions, initialSelectedAnswers }) => {
  const dispatch = useAppDispatch()
  const quizId = useAppSelector((state) => state.quiz.currentQuiz._id)
  const navigate = useNavigate()

  const {
    isOpen: isConfirmationModalOpen,
    openModal: openConfirmationModal,
    closeModal: closeConfirmationModal,
    options: confirmationModalOptions,
  } = useConfirmationModal()

  const [selectedAnswers, setSelectedAnswers] = useState<UserAnswers>(
    initialSelectedAnswers || {},
  )
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]

  // useEffect to handle the repopulation of selected answers
  useEffect(() => {
    setSelectedAnswers(initialSelectedAnswers || {})
  }, [initialSelectedAnswers])

  const handleAnswerChange = (answerId: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const currentQuestionId = currentQuestion?._id
      const selectedAnswersForQuestion =
        prevSelectedAnswers[currentQuestionId] || []

      if (selectedAnswersForQuestion.includes(answerId)) {
        const updatedAnswers = selectedAnswersForQuestion.filter(
          (id) => id !== answerId,
        )
        return {
          ...prevSelectedAnswers,
          [currentQuestionId]: updatedAnswers,
        }
      } else {
        return {
          ...prevSelectedAnswers,
          [currentQuestionId]: [...selectedAnswersForQuestion, answerId],
        }
      }
    })
  }

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentQuestionIndex(value - 1)
    dispatch(setUserAnswers(selectedAnswers))
  }

  const handleSubmitQuiz = () => {
    const allQuestionsAnswered = questions.every(
      (question) => (selectedAnswers[question._id] || []).length > 0,
    )

    if (allQuestionsAnswered) {
      dispatch(
        submitUserAnswers({
          quizId,
          userAnswers: selectedAnswers,
        }),
      )
        .then(() => {
          dispatch(fetchQuiz(quizId))
        })
        .finally(() => {
          dispatch(resetQuiz())
          navigate(`/review/${quizId}`)
        })
    } else {
      alert("Please answer all questions before submitting.")
    }
  }

  const isAnswerSelected = (questionId: string, answerId: string) => {
    return (selectedAnswers[questionId] || []).includes(answerId)
  }

  const isQuestionAnswered = (questionId: string) => {
    return (selectedAnswers[questionId] || []).length > 0
  }

  const isSubmitDisabled = !questions.every((question) =>
    isQuestionAnswered(question._id),
  )

  const handleAbandonQuiz = () => {
    openConfirmationModal({
      onConfirm: () => {
        dispatch(resetQuiz())
        closeConfirmationModal()
      },
      onCancel: closeConfirmationModal,
    })
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
    >
      <TopInfo
        title={`Question ${currentQuestionIndex + 1}`}
        leftItem={{ type: "none" }}
        rightItem={{ type: "timer" }}
      ></TopInfo>
      <Box minHeight={"60vh"} width={"100%"}>
        <Typography variant="h6" gutterBottom textAlign={"center"}></Typography>
        <Typography variant="body1">{currentQuestion?.text}</Typography>
        <FormControl
          component="fieldset"
          style={{ marginTop: "16px", width: "100%" }}
        >
          {currentQuestion?.answers.map((answer, answerIndex) => (
            <StyledCheckbox
              key={answer._id}
              id={answer._id}
              isChecked={isAnswerSelected(currentQuestion._id, answer._id)}
              onChange={handleAnswerChange}
              index={answerIndex}
              text={answer.answerText}
            />
          ))}
        </FormControl>
      </Box>
      <Pagination
        count={questions.length}
        page={currentQuestionIndex + 1}
        onChange={handlePaginationChange}
        variant="outlined"
        color="secondary"
        style={{ marginTop: "16px" }}
      />
      <Box
        style={{ marginTop: "16px" }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleSubmitQuiz}
          disabled={isSubmitDisabled}
          style={{ marginLeft: "16px" }}
          color="primary"
        >
          Submit Quiz
        </Button>
        <Button color="error" onClick={handleAbandonQuiz}>
          Abandon quiz
        </Button>
      </Box>
      <ConfirmationModal
        typography={{
          title: "Abandon the quiz",
          text: "Are you sure you want to abandon the quiz?",
          actionLabel: "Abandon",
        }}
        open={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmationModalOptions?.onConfirm || (() => {})}
      />
    </Grid>
  )
}

export default Quiz
