"use client";
import React, { useMemo } from "react";
import NextLink from "next/link";
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
import InteractiveCalendar from "@/components/sections/InteractiveCalendar";

const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

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

const PageTitleWrapper = styled(Box)({
  textAlign: "center",
  marginBottom: "40px",
});

const EventListContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

const StyledEventCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  width: "100%",
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 350,
  },
  height: 220,
  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  objectFit: "cover",
}));

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

// Placeholder for now mmm es backwards
const sampleEvents = [
  {
    id: 1,
    slug: "event-one-slug",
    type: "Workshop",
    title: "Recycled Horrors Art Workshop",
    date: "2025-08-18",
    time: "7:00 PM - 9:00 PM",
    address: "310 E New Hampshire St, Orlando, FL, 32804",
    description:
      "Make your own upcycled piece of art! Bryan (aka Recycled Horrors Art) and Sarah (Waste Knot Orlando) will be leading a workshop about making your own upcycled art.",
    image: "/wasteknotorlando/assets/RecycledHorrorsArtWorkShop.jpg",
    alt: "Make your own upcycled piece of art! Bryan (aka Recycled Horrors Art) and Sarah (Waste Knot Orlando) will be leading a workshop about making your own upcycled art.",
  },
  {
    id: 2,
    slug: "event-two-slug",
    type: "EVENT TYPE",
    title: "EVENT TITLE",
    date: "2025-06-02",
    time: "12:00 PM",
    address: "Event Location somewhere in orlado probly",
    description: "DESC HERE",
    image: "https://placehold.co/800x800/005B39/FFFFFF?text=EVENT+IMAGE",
    alt: "DESC HERE",
    instagramLink: "https://www.instagram.com/WasteKnotOrlando",
  },
  {
    id: 3,
    slug: "event-three-slug",
    type: "EVENT TYPE",
    title: "EVENT TITLE",
    date: "2025-06-01",
    time: "12:00 PM",
    address: "Event Location somewhere in orlado probly",
    description: "DESC HERE",
    image: "https://placehold.co/800x800/005B39/FFFFFF?text=EVENT+IMAGE",
    alt: "DESC HERE",
    instagramLink: "https://www.instagram.com/WasteKnotOrlando",
  },
];

export default function EventsPage() {
  // For insta link propagation
  const handleInstaClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Need to make sure current events are first card
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      sampleEvents
        .map((event) => {
          const eventDate = new Date(event.date);
          eventDate.setMinutes(
            eventDate.getMinutes() + eventDate.getTimezoneOffset()
          );
          return { ...event, dateObj: eventDate };
        })
        // Filters out the events that already passed
        .filter((event) => event.dateObj >= today)
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    );
  }, []);

  return (
    <PageContainer maxWidth="lg">
      <PageTitleWrapper>
        <PageTitle variant="h1" component="h1">
          Our Events
        </PageTitle>
      </PageTitleWrapper>

      <EventListContainer>
        <Stack spacing={5}>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <StyledEventCard key={event.id}>
                <StyledCardActionArea
                  component={NextLink}
                  href={`/events/${event.slug}`}
                >
                  <StyledCardMedia
                    component="img"
                    image={event.image}
                    alt={event.alt}
                  />
                  <EventInfoContainer>
                    <StyledCardContent>
                      <EventTypeChip label={event.type} />
                      <Typography gutterBottom variant="h3" component="h2">
                        {event.title}
                      </Typography>
                      <InfoLine>
                        <InfoIcon>
                          <CalendarToday sx={{ fontSize: "1.2rem" }} />
                        </InfoIcon>
                        <Typography variant="body1">
                          {event.dateObj.toLocaleDateString()}
                          {event.time ? ` at ${event.time}` : ""}
                        </Typography>
                      </InfoLine>
                      <InfoLine>
                        <InfoIcon>
                          <LocationOn sx={{ fontSize: "1.2rem" }} />
                        </InfoIcon>
                        <Typography variant="body1">{event.address}</Typography>
                      </InfoLine>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        {event.description}
                      </Typography>
                    </StyledCardContent>
                    <CardActions
                      sx={{
                        p: 3,
                        pt: 1,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Button
                        onClick={(e) =>
                          handleInstaClick(e, event.instagramLink!)
                        }
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<Instagram />}
                        // If no insta link
                        disabled={!event.instagramLink}
                      >
                        Check the insta for more details!
                      </Button>
                    </CardActions>
                  </EventInfoContainer>
                </StyledCardActionArea>
              </StyledEventCard>
            ))
          ) : (
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ textAlign: "center", py: 5 }}
            >
              No upcoming events :( Check back soon!
            </Typography>
          )}
        </Stack>
      </EventListContainer>

      <InteractiveCalendar events={sampleEvents} />
    </PageContainer>
  );
}
