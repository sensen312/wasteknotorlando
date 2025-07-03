"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const PageTitleWrapper = styled(Box)({
  textAlign: "center",
  marginBottom: "40px",
});

const PageTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(5),
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
}));

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(4),
}));

const MissionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
  padding: theme.spacing(4, 3),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(8),
  },
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
}));

const LogoImage = styled("img")({
  width: "100%",
  maxWidth: "280px",
  height: "auto",
  display: "block",
  margin: "0 auto",
});

const MissionTextContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(5),
  textAlign: "center",
}));

const MissionStatementText = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  maxWidth: "65ch",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: theme.palette.secondary.main,
    margin: "16px auto 0",
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  height: "100%",
  minWidth: "300px",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

const TeamMemberImage = styled(CardMedia)({
  aspectRatio: "1 / 1",
  objectFit: "cover",
});

const TeamMemberContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

// For Tina CMS
const aboutPageData = {
  pageTitle: "About Us",
  missionStatement:
    "Our mission is to provide a welcoming space where the Orlando community can divert post consumer goods from the trash through reuse.",
  logo: {
    alt: "WasteKnot Orlando Logo",
    image: "/wasteknotorlando/assets/logo.png",
  },
  team: [
    {
      name: "Gru",
      role: "GLORIOUS LEADER",
      image: "/wasteknotorlando/assets/Gru.jpg",
    },
    {
      name: "Minion2",
      role: "Role2",
      image: "/wasteknotorlando/assets/minion.jpg",
    },
    {
      name: "Minion3",
      role: "Role3",
      image: "/wasteknotorlando/assets/minion2.jpg",
    },
  ],
};

export default function AboutUsPage() {
  return (
    <PageContainer maxWidth="lg" component="main">
      <PageTitleWrapper>
        <PageTitle variant="h1" component="h1">
          {aboutPageData.pageTitle}
        </PageTitle>
      </PageTitleWrapper>

      <Section aria-labelledby="mission-heading">
        <MissionContainer>
          <LogoImage
            src={aboutPageData.logo.image}
            alt={aboutPageData.logo.alt}
          />
          <MissionTextContent>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              id="mission-heading"
            >
              Our Mission
            </Typography>
            <MissionStatementText variant="body1" paragraph>
              {aboutPageData.missionStatement}
            </MissionStatementText>
          </MissionTextContent>
        </MissionContainer>
      </Section>

      <Section aria-labelledby="team-heading">
        <SectionTitle variant="h2" component="h2" id="team-heading">
          Meet the Board!
        </SectionTitle>
        <Grid container spacing={4} justifyContent="center">
          {aboutPageData.team.map((member) => (
            <Grid item key={member.name} xs={12} sm={6} md={4}>
              <TeamMemberCard>
                <TeamMemberImage
                  component="img"
                  image={member.image}
                  alt={`${member.name}, ${member.role}`}
                />
                <TeamMemberContent>
                  <Typography variant="h3" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="p"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                    {member.role}
                  </Typography>
                </TeamMemberContent>
              </TeamMemberCard>
            </Grid>
          ))}
        </Grid>
      </Section>
    </PageContainer>
  );
}
