"use client";
import { PageBlocksRich_text_content } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Box } from "@mui/material";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const RichTextContentBlock = ({
  data,
}: {
  data: PageBlocksRich_text_content;
}) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{ my: 4, ".prose": { a: { color: "primary.main" } } }}
        className="prose"
        data-tina-field={tinaField(data, "body")}
      >
        <TinaMarkdown content={data.body} />
      </Box>
    </Container>
  );
};
