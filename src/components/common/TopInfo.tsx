import ArrowBack from "@mui/icons-material/ArrowBack"
import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import Timer from "./Timer"
import AddIcon from "@mui/icons-material/Add"

interface TopInfoProps {
  title: string
  leftItem: {
    type: "arrowBack" | "none"
    leftHandler?: () => void
  }
  rightItem: {
    type: "timer" | "addItem" | "none"
    rightHandler?: () => void
    tooltip?: string
  }
}

export default function TopInfo({ leftItem, title, rightItem }: TopInfoProps) {
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
            <IconButton onClick={leftItem.leftHandler} color="secondary">
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
        {rightItem.type === "none" && <></>}
      </Grid>
    </Grid>
  )
}
