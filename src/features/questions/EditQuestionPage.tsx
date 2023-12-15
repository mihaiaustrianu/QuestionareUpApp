import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import EditQuestionCard from "../../components/questions/EditQuestionCard"
import { updateQuestion } from "./questionsSlice"

const EditQuestionPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>()
  const question = useAppSelector((state) =>
    state.question.questions.find((q) => q._id === questionId),
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const questionSetId = useAppSelector((state) => state.question.questionSetId)

  const handleSave = (updatedQuestion) => {
    dispatch(updateQuestion(updatedQuestion))
    navigate(`/edit-questionSet/${questionSetId}`)
  }

  if (!question) {
    return <div>Question not found</div>
  }

  return (
    <div>
      <EditQuestionCard onSave={handleSave} question={question} />
    </div>
  )
}

export default EditQuestionPage
