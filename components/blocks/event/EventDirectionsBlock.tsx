"use client";
import React, { useState } from "react";
import { Event } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Map as MapIcon,
  Apple as AppleIcon,
  ContentCopy,
  CheckCircleOutline,
} from "@mui/icons-material";

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: theme.spacing(4, "auto"),
}));

const AddressBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: "1px solid",
  borderColor: "divider",
  borderRadius: theme.shape.borderRadius * 2,
}));

const MapsButtonStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const EventDirectionsBlock = ({ eventData }: { eventData: Event }) => {
  const [copied, setCopied] = useState(false);

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

  return (
    <StyledContainer maxWidth="md">
      <Typography
        variant="h4"
        data-tina-field={tinaField(eventData, "directionsHeader")}
        gutterBottom
      >
        {eventData.directionsHeader || "Get Directions"}
      </Typography>
      <AddressBox data-tina-field={tinaField(eventData, "address")}>
        <Typography>{eventData.address}</Typography>
        <IconButton onClick={handleCopy} aria-label="Copy address">
          {copied ? <CheckCircleOutline color="success" /> : <ContentCopy />}
        </IconButton>
      </AddressBox>
      <MapsButtonStack spacing={1.5}>
        {eventData.googleMapsLink && (
          <Button
            variant="outlined"
            startIcon={<MapIcon />}
            fullWidth
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
            href={eventData.appleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Maps
          </Button>
        )}
      </MapsButtonStack>
    </StyledContainer>
  );
};
