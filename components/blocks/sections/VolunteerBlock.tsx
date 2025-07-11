"use client";
import { PageBlocksVolunteer_Section } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  "&:hover": { transform: "translateY(-8px)", boxShadow: theme.shadows[8] },
}));
const InfoCardHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: "clamp(1.5rem, 4.1vw, 1.8rem) !important",
  letterSpacing: ".2px !important",
  color: theme.palette.primary.main,
  ...(theme.typography.fontFamily.includes("OpenDyslexic") && {
    fontSize: "clamp(1.2rem, 3.75vw, 1.5rem) !important",
    letterSpacing: ".2px !important",
  }),
}));
const InfoCardContent = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
  fontSize: "1.05rem",
  lineHeight: 1.6,
}));

export const VolunteerBlock = ({
  data,
}: {
  data: PageBlocksVolunteer_Section;
}) => {
  return (
    <PageWrapper maxWidth="lg">
      <PageHeader>
        <PageTitle
          variant="h1"
          component="h1"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </PageTitle>
        <PageSubtitle
          variant="h5"
          color="text.secondary"
          data-tina-field={tinaField(data, "subtitle")}
        >
          {data.subtitle}
        </PageSubtitle>
      </PageHeader>
      <InfoSection>
        <InfoSectionContainer>
          {data.cards?.map((card) => (
            <InfoCard
              key={card?.title}
              elevation={0}
              data-tina-field={tinaField(card!)}
            >
              <InfoCardHeader
                variant="h2"
                component="h2"
                data-tina-field={tinaField(card!, "title")}
              >
                {card?.title}
              </InfoCardHeader>
              <InfoCardContent
                variant="body1"
                data-tina-field={tinaField(card!, "description")}
              >
                {card?.description}
              </InfoCardContent>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  href={card?.button?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  data-tina-field={tinaField(card!, "button")}
                >
                  {card?.button?.text}
                </Button>
              </Box>
            </InfoCard>
          ))}
        </InfoSectionContainer>
      </InfoSection>
    </PageWrapper>
  );
};
