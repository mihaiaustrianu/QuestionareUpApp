import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material"
import { Answer } from "../../features/questions/questionsSlice"

interface AnswerFieldProps {
  answer: Answer
  onChange: (field: string, value: string | boolean) => void
  onDelete?: () => void
}

const AnswerField: React.FC<AnswerFieldProps> = ({
  answer,
  onChange,
  onDelete,
}) => {
  return (
    <FormGroup>
      <TextField
        label="Answer Text"
        value={answer.answerText}
        onChange={(e) => onChange("answerText", e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={answer.isCorrect}
            onChange={(e) => onChange("isCorrect", e.target.checked)}
          />
        }
        label="Is Correct?"
      />
      {onDelete && (
        <Button variant="outlined" color="error" onClick={onDelete}>
          Delete Answer
        </Button>
      )}
    </FormGroup>
  )
}
export default AnswerField
