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
}));

export const EventImageBlock = ({ data: event }: { data: Event }) => {
  if (!event.image?.src) return null;

  return (
    <StyledEventImage
      component="img"
      image={event.image.src}
      alt={event.image.alt ?? ""}
      data-tina-field={tinaField(event, "image")}
    />
  );
};
