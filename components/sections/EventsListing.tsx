"use client";
import React, { useMemo } from "react";
import NextLink from "next/link";
import { Event, PageBlocksEvents_listing } from "@/tina/__generated__/types";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Stack,
  CardActionArea,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { LocationOn, CalendarToday, Instagram } from "@mui/icons-material";
import { tinaField } from "tinacms/dist/react";

const getRichTextContent = (content: any): string => {
  let text = "";
  if (content && content.children) {
    for (const child of content.children) {
      if (child.type === "text" && child.text) {
        text += child.text;
      } else {
        text += getRichTextContent(child);
      }
    }
  }
  return text;
};

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
const EventListContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));
const StyledEventCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: { flexDirection: "row" },
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  overflow: "hidden",
  "&:hover": { transform: "translateY(-4px)", boxShadow: theme.shadows[6] },
}));
const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: { flexDirection: "row" },
  width: "100%",
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: alpha(theme.palette.common.black, 0.03),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    width: "40%",
    maxWidth: "350px",
    flexShrink: 0,
  },
}));
const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "auto",
  maxHeight: "300px",
  objectFit: "contain",
});
const EventInfoContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
});
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));
const EventTypeChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  color: theme.palette.primary.main,
  fontWeight: "bold",
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
}));
const InfoLine = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
}));
const InfoIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const DescriptionPreview = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export default function EventsListing({
  data,
  allEvents,
}: {
  data: PageBlocksEvents_listing;
  allEvents: Event[];
}) {
  const handleInstaClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const upcomingEvents = useMemo(() => {
    if (!allEvents) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return allEvents
      .map((event) => ({ ...event, dateObj: new Date(event.date) }))
      .filter((event) => event.dateObj >= today)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  }, [allEvents]);

  return (
    <PageContainer maxWidth="lg" data-tina-field={tinaField(data)}>
      <PageTitleWrapper>
        <PageTitle
          variant="h1"
          component="h1"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </PageTitle>
      </PageTitleWrapper>
      <EventListContainer>
        <Stack spacing={5}>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(
              (event) =>
                event?._sys?.filename && (
                  <StyledEventCard
                    key={event.id}
                    data-tina-field={tinaField(event)}
                  >
                    <StyledCardActionArea
                      component={NextLink}
                      href={`/events/${event._sys.filename}`}
                      aria-label={`View details for ${event.title}`}
                    >
                      <ImageWrapper>
                        <StyledCardMedia
                          component="img"
                          image={event.image?.src || undefined}
                          alt={event.image?.alt || ""}
                          data-tina-field={tinaField(event, "image")}
                        />
                      </ImageWrapper>
                      <EventInfoContainer>
                        <StyledCardContent>
                          {event.type && (
                            <EventTypeChip
                              label={event.type}
                              data-tina-field={tinaField(event, "type")}
                            />
                          )}
                          <Typography
                            gutterBottom
                            variant="h3"
                            component="h2"
                            data-tina-field={tinaField(event, "title")}
                          >
                            {event.title}
                          </Typography>
                          <InfoLine data-tina-field={tinaField(event, "date")}>
                            <InfoIcon>
                              <CalendarToday sx={{ fontSize: "1.2rem" }} />
                            </InfoIcon>
                            <Typography variant="body1">
                              {event.dateObj.toLocaleDateString()} at{" "}
                              {event.dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                          </InfoLine>
                          <InfoLine
                            data-tina-field={tinaField(event, "address")}
                          >
                            <InfoIcon>
                              <LocationOn sx={{ fontSize: "1.2rem" }} />
                            </InfoIcon>
                            <Typography variant="body1">
                              {event.address}
                            </Typography>
                          </InfoLine>
                          <DescriptionPreview
                            variant="body2"
                            color="text.secondary"
                            data-tina-field={tinaField(event, "body")}
                          >
                            {getRichTextContent(event.body)}
                          </DescriptionPreview>
                        </StyledCardContent>
                        <CardActions
                          sx={{ p: 3, pt: 1, alignSelf: "flex-start" }}
                        >
                          {event.instagramLink && (
                            <Button
                              onClick={(e) =>
                                handleInstaClick(e, event.instagramLink!)
                              }
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<Instagram />}
                              aria-label={`View Instagram post for ${event.title}`}
                              data-tina-field={tinaField(
                                event,
                                "instagramLink"
                              )}
                            >
                              Check the insta
                            </Button>
                          )}
                        </CardActions>
                      </EventInfoContainer>
                    </StyledCardActionArea>
                  </StyledEventCard>
                )
            )
          ) : (
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ textAlign: "center", py: 5 }}
              data-tina-field={tinaField(data, "noEventsText")}
            >
              {data.noEventsText}
            </Typography>
          )}
        </Stack>
      </EventListContainer>
    </PageContainer>
  );
}
