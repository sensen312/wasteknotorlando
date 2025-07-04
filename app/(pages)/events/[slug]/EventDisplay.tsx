"use client";
import React, { useState } from "react";
import { Event } from "@/tina/__generated__/types";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Chip,
  Stack,
  Divider,
  IconButton,
  CardMedia,
} from "@mui/material";
import {
  Instagram,
  Map as MapIcon,
  Apple as AppleIcon,
  ContentCopy,
  CheckCircleOutline,
  CalendarToday,
  Place,
} from "@mui/icons-material";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const PageContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    minHeight: "85vh",
  },
}));

const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  gap: theme.spacing(4),
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const Cell = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: 0,
  overflow: "hidden",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
}));

const DetailsStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  justifyContent: "space-between",
}));

const DescriptionBody = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  marginBlock: "1.5rem",
});

const EventTypeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  color: theme.palette.primary.main,
  fontWeight: "bold",
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
  alignSelf: "flex-start",
}));

const ActionButton = styled(Button)({
  alignSelf: "flex-start",
});

const EventImage = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const LocationStack = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  flexGrow: 1,
  top: "0",
  padding: theme.spacing(4),
}));

const AddressBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.02),
}));

const MapContainer = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "450px",
  borderRadius: "inherit",
  overflow: "hidden",
});

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

const EventTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const DirectionsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const DividerWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function EventDisplay({
  eventData,
}: {
  eventData: Event | undefined;
}) {
  const [copied, setCopied] = useState(false);

  if (!eventData) {
    return (
      <PageContainer maxWidth="lg">
        <Typography variant="h4" component="h1" align="center">
          Event not found.
        </Typography>
      </PageContainer>
    );
  }

  const handleCopy = () => {
    if (!eventData?.address) return;
    navigator.clipboard
      .writeText(eventData.address)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy address: ", err));
  };

  const eventDate = new Date(eventData.date);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <PageContainer maxWidth="lg">
      <Row>
        <Cell>
          <ContentPaper elevation={0}>
            <DetailsStack spacing={2}>
              <Box>
                {eventData.type && <EventTypeChip label={eventData.type} />}
                <EventTitle variant="h2" component="h1">
                  {eventData.title}
                </EventTitle>
              </Box>
              <Box>
                <InfoLine>
                  <InfoIcon>
                    <CalendarToday />
                  </InfoIcon>
                  <Typography variant="h6" component="p">
                    {formattedDate} at {formattedTime}
                  </Typography>
                </InfoLine>
                <InfoLine>
                  <InfoIcon>
                    <Place />
                  </InfoIcon>
                  <Typography variant="h6" component="p">
                    {eventData.address}
                  </Typography>
                </InfoLine>
              </Box>
              <DescriptionBody>
                <TinaMarkdown content={eventData.body} />
              </DescriptionBody>
              {eventData.instagramLink && (
                <Box>
                  <DividerWrapper>
                    <Divider />
                  </DividerWrapper>
                  <ActionButton
                    variant="contained"
                    color="primary"
                    startIcon={<Instagram />}
                    href={eventData.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Event Instagram
                  </ActionButton>
                </Box>
              )}
            </DetailsStack>
          </ContentPaper>
        </Cell>
        <Cell>
          <ContentPaper elevation={0}>
            <EventImage
              component="img"
              image={eventData.image?.src ?? undefined}
              alt={eventData.image?.alt ?? ""}
            />
          </ContentPaper>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <ContentPaper elevation={0}>
            <LocationStack spacing={3}>
              <Box>
                <DirectionsTitle variant="h5">Get Directions</DirectionsTitle>
                <AddressBox>
                  <Typography variant="body1" component="p">
                    {eventData.address}
                  </Typography>
                  <IconButton onClick={handleCopy} aria-label="Copy address">
                    {copied ? (
                      <CheckCircleOutline color="success" />
                    ) : (
                      <ContentCopy />
                    )}
                  </IconButton>
                </AddressBox>
              </Box>
              <Stack spacing={1.5}>
                {eventData.googleMapsLink && (
                  <Button
                    variant="outlined"
                    startIcon={<MapIcon />}
                    fullWidth
                    component="a"
                    href={eventData.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps
                  </Button>
                )}
                {eventData.appleMapsLink && (
                  <Button
                    variant="outlined"
                    startIcon={<AppleIcon />}
                    fullWidth
                    component="a"
                    href={eventData.appleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apple Maps
                  </Button>
                )}
              </Stack>
            </LocationStack>
          </ContentPaper>
        </Cell>
        <Cell>
          <ContentPaper elevation={0}>
            {eventData.embedMapSrc && (
              <MapContainer>
                <iframe
                  src={eventData.embedMapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google Map for ${eventData.title}`}
                />
              </MapContainer>
            )}
          </ContentPaper>
        </Cell>
      </Row>
    </PageContainer>
  );
}
