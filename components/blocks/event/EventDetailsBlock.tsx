"use client";
import {
  Event,
  EventCore_layoutEvent_details,
} from "@/tina/__generated__/types";
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

export const EventDetailsBlock = ({
  data: blockData,
  eventData,
}: {
  data: EventCore_layoutEvent_details;
  eventData: Event;
}) => {
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
    <Container maxWidth="lg" data-tina-field={tinaField(blockData)}>
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
          <InfoLine data-tina-field={tinaField(blockData, "address")}>
            <InfoIcon>
              <Place />
            </InfoIcon>
            <Typography variant="h6" component="p">
              {blockData.address}
            </Typography>
          </InfoLine>
        </Box>

        <ActionStack direction="row" spacing={2} flexWrap="wrap">
          {blockData.showSignUpButton && blockData.signUpLink && (
            <Button
              href={blockData.signUpLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="secondary"
              data-tina-field={tinaField(blockData, "signUpLink")}
            >
              Sign Up
            </Button>
          )}
          {blockData.instagramLink && (
            <Button
              href={blockData.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<Instagram />}
              data-tina-field={tinaField(blockData, "instagramLink")}
            >
              {blockData.instagramButtonText || "View on Instagram"}
            </Button>
          )}
        </ActionStack>
      </DetailsStack>
    </Container>
  );
};
