import { useEffect, useState } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  QuestionSet,
  fetchQuestionSets,
} from "../../features/question-set/questionSetSlice"
import { createQuiz, updateTimeToSolve } from "../../features/quizes/quizSlice"
import StyledCheckbox from "./StyledCheckbox"
import TopInfo from "../TopInfo"

const QuizMenu = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState("")
  const [timeToSolve, setTimeToSolve] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const [isStartButtonVisible, setStartButtonVisible] = useState(false)

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
    setStartButtonVisible(updatedItems.length > 0)
  }

  const handleStartQuiz = (e) => {
    e.preventDefault() // Prevents the default form submission
    dispatch(updateTimeToSolve(timeToSolve))
    dispatch(
      createQuiz({
        questionSetIds: selectedItems.map((item) => item._id),
        numberOfQuestions: Number(numberOfQuestions),
        userId: userId,
      }),
    )

    // Reset form values after dispatching the action
    setNumberOfQuestions("")
    setTimeToSolve(0)
    setSelectedItems([])
    setStartButtonVisible(false)
  }

  return (
    <>
      <TopInfo
        arrowBack={false}
        title="Start a new Quiz"
        timer={false}
      ></TopInfo>
      <Paper style={styles.paper}>
        <form onSubmit={handleStartQuiz}>
          <FormControl fullWidth>
            <InputLabel>How many questions do you want to solve?</InputLabel>
            <Select
              required
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: 16 }}>
            <InputLabel>
              In how much time do you want to solve the questions
            </InputLabel>
            <Select
              required
              value={timeToSolve}
              onChange={(e) => setTimeToSolve(e.target.value)}
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
                  text={item.title}
                  onChange={() => handleCheckboxChange(item)}
                  index={index}
                  isChecked={selectedItems.includes(item)}
                ></StyledCheckbox>
              ))}
            </FormGroup>
          </FormControl>

          {isStartButtonVisible && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
            >
              Start Quiz
            </Button>
          )}
        </form>
      </Paper>
    </>
  )
}

const styles = {
  paper: {
    width: "80%",
    padding: "20px",
    margin: "0 auto", // Center the paper horizontally
  },
}

export default QuizMenu
