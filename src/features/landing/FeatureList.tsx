import React from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

const FeatureListContainer = styled(Box)<FeatureListProps>`
  display: ${(props) => (props.showFeatures ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 4rem;
`

const Feature = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`

interface FeatureListProps {
  showFeatures: boolean
}

const FeatureList: React.FC<FeatureListProps> = ({ showFeatures }) => {
  return (
    <FeatureListContainer showFeatures={showFeatures}>
      <Feature>
        <Typography variant="h5">Create Questionnaires</Typography>
        <Typography variant="body2">
          Design and customize your own questionnaires for various purposes.
        </Typography>
      </Feature>
      <Feature>
        <Typography variant="h5">Answer Surveys</Typography>
        <Typography variant="body2">
          Participate in surveys and provide valuable feedback and insights.
        </Typography>
      </Feature>
      <Feature>
        <Typography variant="h5">Track Responses</Typography>
        <Typography variant="body2">
          Monitor and analyze survey responses to gain meaningful data.
        </Typography>
      </Feature>
    </FeatureListContainer>
  )
}

export default FeatureList
