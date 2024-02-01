// QuizResults.jsx
import React, { useState } from "react"
import { Box, List, Typography, Pagination, Chip } from "@mui/material"
import CustomCard from "../common/CustomCard"
import TopInfo from "../common/TopInfo"
import theme from "../../utils/muitheme"
import Layout from "../common/Layout"
import { capitalizeFirstLetter } from "../../utils/HelperFunctions"

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
    <Layout>
      <TopInfo
        title={`Question ${startIndex + 1}`}
        leftItem={{ type: "arrowBack" }}
        rightItem={{
          tooltip: `${score} / ${questions.length}`,
          type: "score",
        }}
      ></TopInfo>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        width={"100%"}
      >
        {displayedQuestions.map((question, index) => {
          const areAllCorrectSelected = question.answers.every((answer) => {
            const userAnswerIndex = userAnswers[
              startIndex + index
            ].userSelectedAnswer.indexOf(answer._id)
            return (userAnswerIndex !== -1) === answer.isCorrect
          })
          return (
            <Box
              width={"80%"}
              key={question._id}
              marginBottom="20px"
              minHeight={"70vh"}
            >
              <Typography
                variant="body1"
                color={
                  areAllCorrectSelected
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              >
                {startIndex +
                  index +
                  1 +
                  ". " +
                  capitalizeFirstLetter(question.text)}
              </Typography>
              <List>
                {question.answers.map((answer, answerIndex: number) => {
                  const userAnswerIndex = userAnswers[
                    startIndex + index
                  ].userSelectedAnswer.indexOf(answer._id)
                  const isSelected = userAnswerIndex !== -1
                  const isCorrect = answer.isCorrect

                  return (
                    <CustomCard key={answer._id}>
                      <Box
                        display={"flex"}
                        textAlign={"center"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"} textAlign={"left"}>
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
                          <Typography
                            color={
                              isCorrect
                                ? theme.palette.success.main
                                : theme.palette.error.main
                            }
                          >
                            {capitalizeFirstLetter(answer.answerText)}
                          </Typography>
                        </Box>
                        <Box>
                          {isSelected && (
                            <Chip
                              variant="outlined"
                              label={"Selected answer"}
                              sx={{
                                backgroundColor: "orange",
                                marginLeft: "6px",
                              }}
                            ></Chip>
                          )}
                        </Box>
                      </Box>
                      {answer.answerDescription && (
                        <Typography mt={2}>
                          {capitalizeFirstLetter(answer.answerDescription)}
                        </Typography>
                      )}
                    </CustomCard>
                  )
                })}
              </List>
            </Box>
          )
        })}
      </Box>
      <Pagination
        count={Math.ceil(questions.length / questionsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Layout>
  )
}

export default QuizResults
