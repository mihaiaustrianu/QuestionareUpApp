import { Box, Pagination } from "@mui/material"

import TopInfo from "../common/TopInfo"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Quiz, fetchQuizes } from "../../features/quiz-history/quizHistorySlice"
import QuizHistoryCard from "./QuizHistoryCard"
import { fetchQuiz } from "../../features/quizes/quizReviewSlice"

export default function QuizHistory() {
  const dispatch = useAppDispatch()

  const quizesStatus = useAppSelector((state) => state.quizHistory.status)

  const navigate = useNavigate()

  useEffect(() => {
    if (quizesStatus === "idle") dispatch(fetchQuizes())
  }, [dispatch, quizesStatus])

  const quizes: Quiz[] = useAppSelector((state) => state.quizHistory.quizes)

  const handleQuizClick = (quiz: Quiz) => {
    dispatch(fetchQuiz(quiz._id))
    navigate(`/review/${quiz._id}`)
  }

  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(quizes.length / itemsPerPage)

  const paginatedQuizes = quizes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)
  }

  return (
    <Box>
      <TopInfo
        leftItem={{ type: "none" }}
        rightItem={{ type: "none" }}
        title={`Your past quizes`}
      ></TopInfo>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        minHeight={"70vh"}
      >
        {paginatedQuizes.map((quiz, index) => (
          <Box width={"80%"} key={quiz._id}>
            <QuizHistoryCard
              key={quiz._id}
              quiz={quiz}
              onClickSet={() => handleQuizClick(quiz)}
            />
          </Box>
        ))}

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: "10px" }}
        />
      </Box>
    </Box>
  )
}
