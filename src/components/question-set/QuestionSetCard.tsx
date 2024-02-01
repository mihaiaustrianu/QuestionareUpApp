import { CardContent, CardActions, Typography, IconButton } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import CustomCard from "../common/CustomCard"

const QuestionSetCard = ({ questionSet, onEdit, onDelete, onClickSet }) => {
  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h5">{questionSet.title}</Typography>
        <Typography>{questionSet.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Edit" onClick={() => onEdit(questionSet)}>
          <Edit />
        </IconButton>
        <IconButton aria-label="Delete" onClick={() => onDelete(questionSet)}>
          <Delete />
        </IconButton>
        <IconButton
          aria-label="View Questions"
          onClick={() => onClickSet(questionSet)}
        >
          Questions
        </IconButton>
      </CardActions>
    </CustomCard>
  )
}

export default QuestionSetCard
