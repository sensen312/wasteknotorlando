"use client";
import { PageBlocksMission_statement } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Box, Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(4),
}));
const MissionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
  padding: theme.spacing(4, 3),
  [theme.breakpoints.up("md")]: { padding: theme.spacing(8) },
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
}));
const LogoImage = styled("img")({
  width: "100%",
  maxWidth: "280px",
  height: "auto",
  display: "block",
  margin: "0 auto",
});
const MissionTextContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(5),
  textAlign: "center",
}));

export const MissionStatementBlock = ({
  data,
}: {
  data: PageBlocksMission_statement;
}) => {
  return (
    <Container maxWidth="lg">
      <Section aria-labelledby="mission-heading">
        <MissionContainer>
          {data.image?.src && (
            <LogoImage
              src={data.image.src}
              alt={data.image.alt || ""}
              data-tina-field={tinaField(data, "image")}
            />
          )}
          <MissionTextContent>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              id="mission-heading"
              data-tina-field={tinaField(data, "title")}
            >
              {data.title}
            </Typography>
            <Box
              sx={{ fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "65ch" }}
              data-tina-field={tinaField(data, "statement")}
            >
              <TinaMarkdown content={data.statement} />
            </Box>
          </MissionTextContent>
        </MissionContainer>
      </Section>
    </Container>
  );
};
