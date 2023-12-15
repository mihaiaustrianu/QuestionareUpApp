import React from "react"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { Grid, Typography } from "@mui/material"
import Timer from "./Timer"

interface TopInfoProps {
  arrowBack: boolean
  title: string
  timer: boolean
}

export default function TopInfo({ arrowBack, title, timer }: TopInfoProps) {
  return (
    <Grid
      container
      columns={{ xs: 3 }}
      alignContent={"center"}
      marginBottom={"16px"}
    >
      <Grid item xs={1}>
        {arrowBack && <ArrowBackIosNewIcon></ArrowBackIosNewIcon>}
      </Grid>
      <Grid item xs={1} textAlign={"center"}>
        <Typography variant="body1">{title}</Typography>
      </Grid>
      <Grid item xs={1} textAlign={"center"}>
        {timer && <Timer></Timer>}
      </Grid>
    </Grid>
  )
}
