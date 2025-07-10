"use client";
import { Event } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: theme.spacing(4, "auto"),
}));

const MapWrapper = styled(Box)({
  overflow: "hidden",
  paddingBottom: "56.25%",
  position: "relative",
  height: 0,
  borderRadius: "16px",
});

const StyledIframe = styled("iframe")({
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  position: "absolute",
  border: 0,
});

export const EventMapEmbedBlock = ({ data: event }: { data: Event }) => {
  const hasValidMapSrc = event.embedMapSrc && event.embedMapSrc !== "#";
  if (!hasValidMapSrc) return null;

  return (
    <StyledContainer maxWidth="lg">
      <MapWrapper data-tina-field={tinaField(event, "embedMapSrc")}>
        <StyledIframe
          src={event.embedMapSrc!}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Google Map for ${event.title}`}
        />
      </MapWrapper>
    </StyledContainer>
  );
};
