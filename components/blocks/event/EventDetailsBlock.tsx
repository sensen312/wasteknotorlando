"use client";
import { Event } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Box, Container, Typography, Chip, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CalendarToday, Place, Instagram } from "@mui/icons-material";

const DetailsStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  justifyContent: "center",
}));

const InfoLine = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const EventTypeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
  fontWeight: "bold",
  alignSelf: "flex-start",
}));

const EventTitle = styled(Typography)({
  marginTop: "16px",
});

const ActionStack = styled(Stack)({
  marginTop: "24px",
});

export const EventDetailsBlock = ({ eventData }: { eventData: Event }) => {
  const eventDate = new Date(eventData.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  });

  return (
    <Container maxWidth="lg" data-tina-field={tinaField(eventData)}>
      <DetailsStack spacing={2}>
        <Box>
          {eventData.type && (
            <EventTypeChip
              label={eventData.type}
              data-tina-field={tinaField(eventData, "type")}
            />
          )}
          <EventTitle
            variant="h2"
            component="h1"
            data-tina-field={tinaField(eventData, "title")}
          >
            {eventData.title}
          </EventTitle>
        </Box>
        <Box>
          <InfoLine data-tina-field={tinaField(eventData, "date")}>
            <InfoIcon>
              <CalendarToday />
            </InfoIcon>
            <Typography variant="h6" component="p">
              {formattedDate} at {formattedTime}
            </Typography>
          </InfoLine>
          <InfoLine data-tina-field={tinaField(eventData, "address")}>
            <InfoIcon>
              <Place />
            </InfoIcon>
            <Typography variant="h6" component="p">
              {eventData.address}
            </Typography>
          </InfoLine>
        </Box>

        <ActionStack direction="row" spacing={2} flexWrap="wrap">
          {eventData.showSignUpButton && eventData.signUpLink && (
            <Button
              href={eventData.signUpLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              data-tina-field={tinaField(eventData, "signUpLink")}
            >
              {eventData.signUpButtonText || "Sign Up"}
            </Button>
          )}
          {eventData.showInstagramButton && eventData.instagramLink && (
            <Button
              href={eventData.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<Instagram />}
              data-tina-field={tinaField(eventData, "instagramLink")}
            >
              {eventData.instagramButtonText || "View on Instagram"}
            </Button>
          )}
        </ActionStack>
      </DetailsStack>
    </Container>
  );
};
