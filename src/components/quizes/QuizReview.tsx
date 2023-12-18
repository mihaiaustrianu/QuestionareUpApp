// QuizResults.jsx
import React, { useState } from "react"
import { Box, List, Typography, Pagination, Chip } from "@mui/material"
import CustomCard from "../common/CustomCard"

const QuizResults = ({ questions, userAnswers, score }) => {
  const questionsPerPage = 1
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const startIndex = (currentPage - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  const displayedQuestions = questions.slice(startIndex, endIndex)

  return (
    <Box>
      {displayedQuestions.map((question, index) => (
        <Box key={question._id} marginBottom="20px">
          <Typography variant="h6">
            Question {startIndex + index + 1}
          </Typography>
          <Typography variant="body1">{question.text}</Typography>
          <List>
            {question.answers.map((answer, answerIndex: number) => {
              const userAnswerIndex = userAnswers[
                startIndex + index
              ].userSelectedAnswer.indexOf(answer._id)
              const isSelected = userAnswerIndex !== -1
              const isCorrect = answer.isCorrect

              return (
                <CustomCard
                  key={answer._id}
                  highlightColor={
                    isSelected ? (isCorrect ? "success" : "error") : ""
                  }
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    textAlign={"center"}
                  >
                    <Chip
                      variant="outlined"
                      label={String.fromCharCode(65 + answerIndex)}
                      sx={{
                        marginRight: "10px",
                        fontWeight: "bold",
                        border: "2px solid #ccc",
                      }}
                    />
                    <Typography>{answer.answerText}</Typography>
                    {isCorrect ? "(Correct)" : ""}
                  </Box>
                </CustomCard>
              )
            })}
          </List>
        </Box>
      ))}
      <Pagination
        count={Math.ceil(questions.length / questionsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  )
}

export default QuizResults
