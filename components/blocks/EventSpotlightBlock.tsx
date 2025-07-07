"use client";
import { PageBlocksEvent_Spotlight, Event } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Container,
} from "@mui/material";
import NextLink from "next/link";

const SectionHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(3),
  position: "relative",
  paddingBottom: theme.spacing(1),
  "&::after": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: theme.palette.secondary.main,
    bottom: 0,
    left: "calc(50% - 40px)",
  },
}));

const BannerCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "200px",
  [theme.breakpoints.up("md")]: {
    height: "300px",
  },
}));

const BannerActionArea = styled(CardActionArea)({
  height: "100%",
});

const BannerImage = styled(CardMedia)({
  height: "100%",
  objectFit: "cover",
});

const BannerOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 57, 38, 0.5)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  padding: theme.spacing(3),
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 57, 38, 0.7)",
  },
}));

const BannerTitle = styled(Typography)({
  textShadow: "1px 1px 20px rgba(0,0,0,0.7)",
});

export const EventSpotlightBlock = ({
  data,
}: {
  data: PageBlocksEvent_Spotlight;
}) => {
  const event = data.event;
  if (!event) {
    return null;
  }

  const eventData = event as Event;

  return (
    <Container maxWidth="lg">
      <Box my={5}>
        <SectionHeader
          variant="h2"
          component="h2"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </SectionHeader>
        <BannerCard data-tina-field={tinaField(data, "event")}>
          <BannerActionArea
            component={NextLink}
            href={`/events/${eventData._sys.filename}`}
            aria-label={`Link to ${eventData.title} event page`}
          >
            <BannerImage
              component="img"
              image={eventData.image?.src ?? undefined}
              alt={eventData.image?.alt ?? ""}
            />
            <BannerOverlay>
              <BannerTitle variant="h3" component="h3" gutterBottom>
                {eventData.title}
              </BannerTitle>
            </BannerOverlay>
          </BannerActionArea>
        </BannerCard>
      </Box>
    </Container>
  );
};
