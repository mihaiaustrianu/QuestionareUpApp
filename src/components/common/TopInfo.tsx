import ArrowBack from "@mui/icons-material/ArrowBack"
import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import Timer from "./Timer"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"

interface TopInfoProps {
  title: string
  leftItem: {
    type: "arrowBack" | "none"
  }
  rightItem: {
    type: "timer" | "addItem" | "none" | "score"
    rightHandler?: () => void
    tooltip?: string
  }
}

export default function TopInfo({ leftItem, title, rightItem }: TopInfoProps) {
  const navigate = useNavigate()

  const handleNavigateBack = () => {
    navigate(-1)
  }
  return (
    <Grid
      container
      columns={{ xs: 3 }}
      alignContent={"center"}
      marginBottom={"16px"}
    >
      <Grid item xs={1}>
        {leftItem.type === "arrowBack" && (
          <Tooltip title={"Back"}>
            <IconButton onClick={handleNavigateBack} color="secondary">
              <ArrowBack></ArrowBack>
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      <Grid item xs={1} textAlign={"center"}>
        <Typography variant="h6" color={"primary"}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={1} textAlign={"right"}>
        {rightItem.type === "timer" && <Timer></Timer>}
        {rightItem.type === "addItem" && (
          <Tooltip title={`Add new ${rightItem.tooltip}`}>
            <IconButton onClick={rightItem.rightHandler} color="secondary">
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
        {rightItem.type === "score" && (
          <Typography variant={"h6"} color={"secondary"}>
            Score: {rightItem.tooltip}
          </Typography>
        )}
        {rightItem.type === "none" && <></>}
      </Grid>
    </Grid>
  )
}
