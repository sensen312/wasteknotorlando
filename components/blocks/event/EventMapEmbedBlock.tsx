"use client";
import { EventCore_layoutEvent_map_embed } from "@/tina/__generated__/types";
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

// gets iframe from URL
const parseIframeSrc = (iframeString?: string): string | null => {
  if (!iframeString) return null;
  const match = iframeString.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

export const EventMapEmbedBlock = ({
  data,
}: {
  data: EventCore_layoutEvent_map_embed;
}) => {
  const mapSrc = parseIframeSrc(data.iframeEmbed);

  if (!mapSrc) return null;

  return (
    <StyledContainer maxWidth="lg">
      <MapWrapper data-tina-field={tinaField(data, "iframeEmbed")}>
        <StyledIframe
          src={mapSrc}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Google Map for the event`}
        />
      </MapWrapper>
    </StyledContainer>
  );
};
