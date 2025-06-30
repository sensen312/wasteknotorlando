"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
} from "@mui/icons-material";

interface EventType {
  id: number;
  slug: string;
  type: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  address: string;
  instagramLink: string;
  googleMapsLink: string;
  appleMapsLink: string;
  embedMapSrc?: string;
}

const PageContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    minHeight: "85vh",
  },
  marginBottom: theme.spacing(3),
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

const ContentPaper = styled(Paper)({
  padding: 0,
  overflow: "hidden",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

// TopLeft
const DetailsStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  justifyContent: "space-between",
}));

const DescriptionBody = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  marginBlock: "1rem",
});

const EventTypeChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  alignSelf: "flex-start",
}));

const ActionButton = styled(Button)({
  alignSelf: "flex-start",
});

// TopRight
const EventImage = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const LocationStack = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  flexGrow: 1,
  top: "0",
  padding: theme.spacing(1),
}));

const AddressBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: "1px solid #ddd",
  borderRadius: theme.shape.borderRadius,
}));

const MapContainer = styled(Box)({
  width: "100%",
  height: "100%",
  minHeight: "450px",
  borderRadius: "inherit",
  overflow: "hidden",
});

export default function EventDisplay({
  eventData,
}: {
  eventData: EventType | undefined;
}) {
  const [copied, setCopied] = useState(false);

  if (!eventData) {
    return (
      <PageContainer maxWidth="lg">
        <Typography variant="h4" component="h1" align="center">
          Event not found. How did you get here?
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
      .catch((err) => {
        console.error("Failed to copy address: ", err);
      });
  };

  return (
    <PageContainer maxWidth="lg">
      <Row>
        <Cell>
          <ContentPaper elevation={3}>
            <DetailsStack spacing={2}>
              <Box>
                <EventTypeChip label={eventData.type} color="secondary" />
                <Typography variant="h2" component="h1" sx={{ mt: 1 }}>
                  {eventData.title}
                </Typography>
              </Box>

              <DescriptionBody>
                <Typography variant="body1">{eventData.description}</Typography>
              </DescriptionBody>

              <Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {eventData.date}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {eventData.time}
                </Typography>
                <ActionButton
                  variant="contained"
                  color="primary"
                  startIcon={<Instagram />}
                  href={eventData.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                >
                  Event Instagram
                </ActionButton>
              </Box>
            </DetailsStack>
          </ContentPaper>
        </Cell>

        <Cell>
          <ContentPaper elevation={3}>
            <EventImage
              component="img"
              image={eventData.image}
              alt={`Image for ${eventData.title}`}
            />
          </ContentPaper>
        </Cell>
      </Row>

      <Row>
        <Cell>
          <ContentPaper elevation={3}>
            <LocationStack spacing={3}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  ADDRESS:
                </Typography>
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
              </Stack>
            </LocationStack>
          </ContentPaper>
        </Cell>

        <Cell>
          <ContentPaper elevation={3}>
            {eventData.embedMapSrc && (
              <MapContainer>
                <iframe
                  src={eventData.embedMapSrc}
                  width="100%"
                  height="100%"
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
