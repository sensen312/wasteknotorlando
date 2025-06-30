"use client";
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const PageWrapper = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

const PageHeader = styled("section")(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: "center",
  backgroundColor: "transparent",
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  margin: "0 auto",
  marginBottom: theme.spacing(4),
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
}));

const ContentSection = styled("section")(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(5),
}));

const VolunteerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
}));

const VolunteerAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  marginBottom: theme.spacing(2),
}));

const VolunteerQuote = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  flexGrow: 1,
  marginBottom: theme.spacing(2),
}));

const VolunteerAuthor = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

// For TinaCMS
const volunteerPageData = {
  title: "Volunteer or Collaborate with us!",
  subtitle:
    "We would love to collab with other orgs or groups; also happily accept volunteers!",

  callToAction: {
    volunteer: {
      text: "Volunteer Link",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSf1y-mvwEEvMLg1hZsB125j-jv30bYCM01X6e2TbzhGLS5F0A/viewform",
    },
    collab: {
      text: "Collaboration Link ",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeej1Glaa2H3-PQ8qPozjt1JzlJIDypXYErEFfCU82Gwpc54w/viewform",
    },
  },
  volunteers: [
    {
      quote: "FREEZE RAY",
      author: "GRU",
      image: "/assets/Gru.jpg",
    },
    {
      quote: "BANANAAAAA",
      author: "MINION",
      image: "/assets/minion.jpg",
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
        <PageSubtitle variant="h4" color="text.secondary">
          {volunteerPageData.subtitle}
        </PageSubtitle>

        <ActionButtons direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            href={volunteerPageData.callToAction.volunteer.link}
          >
            {volunteerPageData.callToAction.volunteer.text}
          </Button>
          <Button
            variant="contained"
            color="primary"
            href={volunteerPageData.callToAction.collab.link}
          >
            {volunteerPageData.callToAction.collab.text}
          </Button>
        </ActionButtons>
      </PageHeader>

      {/* Maybe add a volunteer positions link*/}

      {/* This feels lackuster */}
      <ContentSection>
        <SectionTitle variant="h2" component="h2">
          Hear from our Volunteers!
        </SectionTitle>
        <Grid container spacing={4} justifyContent="center">
          {volunteerPageData.volunteers.map((volunteer, index) => (
            <Grid key={index}>
              <VolunteerCard>
                <VolunteerAvatar alt={volunteer.author} src={volunteer.image} />
                <VolunteerQuote variant="body1" component="blockquote">
                  &ldquo;{volunteer.quote}&rdquo;
                </VolunteerQuote>
                <VolunteerAuthor variant="h5" component="cite">
                  - {volunteer.author}
                </VolunteerAuthor>
              </VolunteerCard>
            </Grid>
          ))}
        </Grid>
      </ContentSection>
    </PageWrapper>
  );
}
