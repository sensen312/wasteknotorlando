"use client";
import { PageBlocksCanva_canvaembed } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: theme.spacing(4, "auto"),
}));

const CanvaWrapper = styled(Box)({
  overflow: "hidden",
  aspectRatio: "1 / 1.414",
  position: "relative",
  height: "auto",
  width: "100%",
  borderRadius: "16px",
  border: "1px solid",
  borderColor: "divider",
});

const StyledIframe = styled("iframe")({
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  position: "absolute",
  border: 0,
});

const parseIframeSrc = (iframeString?: string): string | null => {
  if (!iframeString) return null;
  const match = iframeString.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

export const CanvaEmbedBlock = ({
  data,
}: {
  data: PageBlocksCanva_canvaembed;
}) => {
  const canvaSrc = parseIframeSrc(data.embedCode);

  if (!canvaSrc) {
    return (
      <StyledContainer maxWidth="md">
        <Typography color="error.main" align="center">
          Your canva code is not correct ;-; please check the canva code you
          have on the cms
        </Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="md">
      <CanvaWrapper data-tina-field={tinaField(data, "embedCode")}>
        <StyledIframe
          src={canvaSrc}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={data.title || "Embedded Canva Design"}
        />
      </CanvaWrapper>
    </StyledContainer>
  );
};
