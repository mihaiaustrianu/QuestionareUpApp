import { useEffect, useState } from "react"
import {
  FormControl,
  MenuItem,
  Select,
  Button,
  FormGroup,
  Typography,
  Box,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  QuestionSet,
  fetchQuestionSets,
} from "../../features/question-set/questionSetSlice"
import { createQuiz } from "../../features/quizes/quizSlice"
import StyledCheckbox from "./StyledCheckbox"
import TopInfo from "../common/TopInfo"
import { unwrapResult } from "@reduxjs/toolkit"
import Layout from "../common/Layout"

const QuizMenu = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5)
  const [timeToSolve, setTimeToSolve] = useState(10)
  const [selectedItems, setSelectedItems] = useState([])
  const [isStartButtonEnabled, setStartButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.auth.userInfo.id)
  const questionStatus = useAppSelector((state) => state.questionSet.status)

  useEffect(() => {
    if (questionStatus === "idle") dispatch(fetchQuestionSets())
  }, [dispatch, questionStatus])

  const questionSets: QuestionSet[] = useAppSelector(
    (state) => state.questionSet.questionSets,
  )
  const handleCheckboxChange = (item) => {
    const updatedItems = [...selectedItems]

    if (updatedItems.includes(item)) {
      updatedItems.splice(updatedItems.indexOf(item), 1)
    } else {
      updatedItems.push(item)
    }

    setSelectedItems(updatedItems)
    setStartButtonEnabled(updatedItems.length > 0)
  }

  const resetQuiz = () => {
    // Reset form values after successful dispatch
    setNumberOfQuestions(5)
    setTimeToSolve(10)
    setSelectedItems([])
    setStartButtonEnabled(false)
  }

  const handleStartQuiz = async (e) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(
        createQuiz({
          questionSetIds: selectedItems.map((item) => item._id),
          numberOfQuestions: Number(numberOfQuestions),
          userId: userId,
          timeToSolve: timeToSolve,
        }),
      )
      unwrapResult(resultAction)
      resetQuiz()
    } catch (error) {
      if (error === "Not enough questions across selected question sets")
        alert(
          "Failed to start quiz, not enough questions in the selected quizes",
        )
    }
  }

  return (
    <Layout>
      <TopInfo
        title="Start a new Quiz"
        leftItem={{ type: "none" }}
        rightItem={{ type: "none" }}
      ></TopInfo>
      <Box width={"100%"} maxWidth={"80%"}>
        <form onSubmit={handleStartQuiz}>
          <Typography variant="h6" color={"primary"} mb={2}>
            How many questions do you want to solve?
          </Typography>
          <FormControl fullWidth>
            <Select
              required
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(+e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" color={"primary"} mt={2}>
            In how much time do you want to solve the questions?
          </Typography>
          <FormControl fullWidth style={{ marginTop: 16 }}>
            <Select
              required
              value={timeToSolve}
              onChange={(e) => setTimeToSolve(+e.target.value)}
            >
              <MenuItem value={10}>10 minutes</MenuItem>
              <MenuItem value={15}>15 minutes</MenuItem>
              <MenuItem value={30}>30 minutes</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: 16 }}>
            <Typography>Choose your question sets</Typography>
            <FormGroup>
              {questionSets.map((item, index) => (
                <StyledCheckbox
                  key={index}
                  text={item.title}
                  onChange={() => handleCheckboxChange(item)}
                  index={index}
                  isChecked={selectedItems.includes(item)}
                ></StyledCheckbox>
              ))}
            </FormGroup>
          </FormControl>
          <Button
            disabled={!isStartButtonEnabled}
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Start Quiz
          </Button>
        </form>
      </Box>
    </Layout>
  )
}

export default QuizMenu
