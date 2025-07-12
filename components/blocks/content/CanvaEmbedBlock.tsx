"use client";
import { PageBlocksCanva_canvaembed } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(5, 2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

const CanvaWrapper = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  aspectRatio: "1 / 1.414",
  position: "relative",
  height: "auto",
  width: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

const StyledIframe = styled("iframe")({
  left: 0,
  top: 0,
  height: "100%",
  width: "100%",
  position: "absolute",
  border: 0,
});

const ErrorMessagePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: alpha(theme.palette.error.main, 0.1),
  color: theme.palette.error.dark,
  border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
}));

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
      <Section>
        <Container maxWidth="md">
          <ErrorMessagePaper elevation={0}>
            <Typography fontWeight="bold">Invalid Embed Code!!</Typography>
            <Typography>
              Your canva code is not correct ;-; please check the canva code you
              have on the cms
            </Typography>
          </ErrorMessagePaper>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container maxWidth="md" data-tina-field={tinaField(data)}>
        {data.title && (
          <SectionTitle
            variant="h2"
            component="h2"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </SectionTitle>
        )}
        <CanvaWrapper data-tina-field={tinaField(data, "embedCode")}>
          <StyledIframe
            src={canvaSrc}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={data.title || "Embedded Canva Design"}
          />
        </CanvaWrapper>
      </Container>
    </Section>
  );
};
