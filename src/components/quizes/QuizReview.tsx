// QuizResults.jsx
import React, { useState } from "react"
import { Box, List, Typography, Pagination, Chip } from "@mui/material"
import CustomCard from "../common/CustomCard"
import TopInfo from "../common/TopInfo"

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
      <TopInfo
        title={`Question ${startIndex + 1}`}
        leftItem={{ type: "arrowBack" }}
        rightItem={{
          tooltip: `${score} / ${questions.length}`,
          type: "score",
        }}
      ></TopInfo>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        {displayedQuestions.map((question, index) => (
          <Box
            width={"80%"}
            key={question._id}
            marginBottom="20px"
            minHeight={"70vh"}
          >
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
                          borderColor: isCorrect ? "#008a3a" : "#9a0000",
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
    </Box>
  )
}

export default QuizResults
