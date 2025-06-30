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
import { styled } from "@mui/material/styles";
import { LocationOn, CalendarToday, Instagram } from "@mui/icons-material";
import InteractiveCalendar from "@/components/sections/InteractiveCalendar";

const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(5),
}));

const EventListContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
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
    address: "310 E New Hampshire St #700Orlando, FL 32804, USA",
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
      <PageTitle variant="h1" component="h1">
        Our Events
      </PageTitle>

      <EventListContainer>
        <Stack spacing={4}>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <Card
                key={event.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CardActionArea
                  component={NextLink}
                  href={`/events/${event.slug}`}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={event.image}
                    alt={event.alt}
                    sx={{
                      width: { xs: "100%", md: 350 },
                      height: { xs: 220, md: "auto" },
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      width: "100%",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip
                        label={event.type}
                        color="secondary"
                        sx={{
                          mb: 1.5,
                          color: "primary.main",
                          fontWeight: "bold",
                        }}
                      />
                      <Typography gutterBottom variant="h3" component="h2">
                        {event.title}
                      </Typography>
                      <Box
                        display="flex"
                        alignItems="center"
                        my={1.5}
                        color="text.secondary"
                      >
                        <CalendarToday sx={{ mr: 1, fontSize: "1.2rem" }} />
                        <Typography variant="body1">
                          {event.dateObj.toLocaleDateString()}
                          {event.time ? ` at ${event.time}` : ""}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        mb={1.5}
                        color="text.secondary"
                      >
                        <LocationOn sx={{ mr: 1, fontSize: "1.2rem" }} />
                        <Typography variant="body1">{event.address}</Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {event.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        p: 2,
                        pt: { xs: 1, md: 2 },
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
                  </Box>
                </CardActionArea>
              </Card>
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
