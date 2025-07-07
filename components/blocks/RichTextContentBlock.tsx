"use client";
import { PageBlocksRich_Text_Content } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Box } from "@mui/material";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const RichTextContentBlock = ({
  data,
}: {
  data: PageBlocksRich_Text_Content; 
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          ".prose": { a: { color: "primary.main" } },
          textAlign: data.align || "left",
        }}
        className="prose"
        data-tina-field={tinaField(data, "body")}
      >
        <TinaMarkdown content={data.body} />
      </Box>
    </Container>
  );
};