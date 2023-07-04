import React, { useState } from "react"
import { Box, Container, Typography, Button, Grid } from "@mui/material"
import { styled } from "@mui/system"
import FeaturesList from "./FeatureList"
import LandingIllustration from "../../svgs/LandingIllustration"
import { Link } from "react-router-dom"

const LandingPageContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const LeftContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const RightContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 800px;
`

const Title = styled(Typography)`
  margin-bottom: 2rem;
`

const Subtitle = styled(Typography)`
  margin-bottom: 2rem;
`

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 1rem;
`

const LandingBase = () => {
  const [showFeatures, setShowFeatures] = useState(false)

  const handleLearnMoreClick = () => {
    setShowFeatures(!showFeatures)
  }
  return (
    <LandingPageContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <LeftContainer>
            <Title variant="h3">QuestionnaireUp</Title>
            <Subtitle variant="body1">
              Create and answer questionnaires with ease.
            </Subtitle>
            <ButtonContainer>
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
            </ButtonContainer>
            {showFeatures && <FeaturesList showFeatures={showFeatures} />}
          </LeftContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RightContainer>
            <LandingIllustration />
          </RightContainer>
        </Grid>
      </Grid>
    </LandingPageContainer>
  )
}

export default LandingBase
