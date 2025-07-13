"use client";
import { PageBlocksRich_Text_Content } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Box } from "@mui/material";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const RichTextContentBlock = ({
  data,
}: {
  data: PageBlocksRich_Text_Content;
}) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={(theme) => ({
          my: 4,
          textAlign: data.align || "left",
          ".prose blockquote": {
            borderLeft: `4px solid ${theme.palette.secondary.main}`,
            paddingLeft: "1rem",
            margin: "1.5rem 0",
            fontStyle: "italic",
            color: "text.secondary",
          },
          ".prose a": {
            color: "primary.main",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        })}
        className="prose"
        data-tina-field={tinaField(data, "body")}
      >
        <TinaMarkdown content={data.body} />
      </Box>
    </Container>
  );
};
