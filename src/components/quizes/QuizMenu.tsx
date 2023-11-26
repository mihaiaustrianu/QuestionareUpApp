import React, { useEffect, useState } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  QuestionSet,
  fetchQuestionSets,
} from "../../features/question-set/questionSetSlice"

const QuizMenu = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState("")
  const [questionType, setQuestionType] = useState("")
  const [timeToSolve, setTimeToSolve] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [isStartButtonVisible, setStartButtonVisible] = useState(false)

  const dispatch = useAppDispatch()

  const questionStatus = useAppSelector((state) => state.questionSet.status)

  useEffect(() => {
    if (questionStatus === "idle") dispatch(fetchQuestionSets())
  }, [dispatch, questionStatus])

  const questionSets: QuestionSet[] = useAppSelector(
    (state) => state.questionSet.questionSets,
  )

  const questionTypes = ["Open", "Closed"]

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

    // Handle starting the quiz with selected options
    console.log(
      "Starting quiz with:",
      numberOfQuestions,
      questionType,
      timeToSolve,
      selectedItems,
    )
  }

  return (
    <>
      <Typography variant="h3" component="h1">
        Start a new quiz
      </Typography>
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
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: 16 }}>
            <InputLabel>Type of questions (open/closed)</InputLabel>
            <Select
              required
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              {questionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
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
            <Typography>Chose your question sets</Typography>
            <FormGroup>
              {questionSets.map((item) => (
                <FormControlLabel
                  key={item._id}
                  control={
                    <Checkbox
                      onChange={() => handleCheckboxChange(item)}
                      value={item}
                      checked={selectedItems.includes(item)}
                    />
                  }
                  label={item.title}
                />
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
