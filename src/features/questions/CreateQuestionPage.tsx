import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import EditQuestionCard from "../../components/questions/EditQuestionCard"
import { createQuestion } from "./questionsSlice"

const CreateQuestionPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const questionSetId = useAppSelector((state) => state.question.questionSetId)

  const handleSave = (updatedQuestion) => {
    dispatch(
      createQuestion({ questionSetId: questionSetId, ...updatedQuestion }),
    )
    navigate(`/edit-questionSet/${questionSetId}`)
  }

  return (
    <div>
      <EditQuestionCard onSave={handleSave} />
    </div>
  )
}

export default CreateQuestionPage
