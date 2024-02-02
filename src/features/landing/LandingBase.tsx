import React, { useState } from "react"
import { Box, Container, Typography, Button, Grid } from "@mui/material"
import FeaturesList from "./FeatureList"
import LandingIllustration from "../../svgs/LandingIllustration"
import { Link } from "react-router-dom"

const LandingBase = () => {
  const [showFeatures, setShowFeatures] = useState(false)

  const handleLearnMoreClick = () => {
    setShowFeatures(!showFeatures)
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid container spacing={4} className="landing-container">
        <Grid item xs={12} sm={6} className="left-container">
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
              QuestionnaireUp
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
              Create and answer questionnaires with ease.
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </Button>
            </Box>
            {showFeatures && <FeaturesList showFeatures={showFeatures} />}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className="right-container">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              maxWidth: { xs: 300, md: 800 },
            }}
          >
            <LandingIllustration />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LandingBase
