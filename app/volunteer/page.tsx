"use client";
import React from "react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const PageWrapper = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

const PageHeader = styled("section")(({ theme }) => ({
  padding: theme.spacing(5, 2),
  textAlign: "center",
  backgroundColor: "transparent",
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  position: "relative",
  display: "inline-block",
  paddingBottom: theme.spacing(1.5),
  "&::after": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "60%",
    height: "4px",
    backgroundColor: theme.palette.secondary.main,
    bottom: 0,
    left: "20%",
  },
  ...(theme.typography.fontFamily.includes("OpenDyslexic") && {
    [theme.breakpoints.down("sm")]: {
      fontSize: "clamp(1.7rem, 7vw, 2.25rem)",
      letterSpacing: "0.5px",
    },
  }),
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  margin: "0 auto",
  marginTop: theme.spacing(4),
  maxWidth: "75ch",
}));

const InfoSection = styled("section")(({ theme }) => ({
  marginBottom: theme.spacing(8),
  marginTop: theme.spacing(4),
}));

const InfoSectionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  flexWrap: "wrap",
  justifyContent: "center",
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  flex: "1 1 300px",
  maxWidth: "400px",
  minWidth: "300px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: "none",
  borderTop: `5px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const InfoCardHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const InfoCardContent = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
  fontSize: "1.05rem",
  lineHeight: 1.6,
}));

// For TinaCMS
const volunteerPageData = {
  title: "Volunteer or Collaborate with us!",
  subtitle:
    "We would love to collab with other orgs or groups; also happily accept volunteers!",
  infoSections: [
    {
      title: "Volunteer",
      description: "Help us out with your fancy dandy skills.",
      buttonText: "Volunteer Link",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSf1y-mvwEEvMLg1hZsB125j-jv30bYCM01X6e2TbzhGLS5F0A/viewform",
    },
    {
      title: "Collaborate",
      description:
        "Organization or individuals alike are encouraged to collab with us for events or other opportunities!",
      buttonText: "Collaboration Link",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeej1Glaa2H3-PQ8qPozjt1JzlJIDypXYErEFfCU82Gwpc54w/viewform",
    },
    {
      title: "Newsletter",
      description: "Stay informed with our newsletter.",
      buttonText: "Sign Up Now",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeTAtF6jXzdXoA0RCb6_RdqDplBUmPTS7wBHKCVYZkmoGfAHw/viewform",
    },
  ],
};

export default function VolunteerPage() {
  return (
    <PageWrapper maxWidth="lg" component="main">
      <PageHeader>
        <PageTitle variant="h1" component="h1">
          {volunteerPageData.title}
        </PageTitle>
        <PageSubtitle variant="h5" color="text.secondary">
          {volunteerPageData.subtitle}
        </PageSubtitle>
      </PageHeader>

      <InfoSection>
        <InfoSectionContainer>
          {volunteerPageData.infoSections.map((section) => (
            <InfoCard key={section.title} elevation={0}>
              <InfoCardHeader variant="h2" component="h2">
                {section.title}
              </InfoCardHeader>
              <InfoCardContent variant="body1">
                {section.description}
              </InfoCardContent>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                >
                  {section.buttonText}
                </Button>
              </Box>
            </InfoCard>
          ))}
        </InfoSectionContainer>
      </InfoSection>
    </PageWrapper>
  );
}
