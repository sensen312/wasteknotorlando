"use client";
import { Event } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledEventImage = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  maxHeight: "600px",
  height: "auto",
  objectFit: "contain",
  margin: theme.spacing(4, 0),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 12px rgba(0, 91, 57, 0.1)",
}));

export const EventImageBlock = ({ eventData }: { eventData: Event }) => {
  if (!eventData.image?.src) return null;

  return (
    <StyledEventImage
      component="img"
      image={eventData.image.src}
      alt={eventData.image.alt ?? ""}
      data-tina-field={tinaField(eventData, "image")}
    />
  );
};
