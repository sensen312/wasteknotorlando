"use client";
import { PageBlocksSection_Header } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(1),
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SectionHeaderBlock = ({
  data,
}: {
  data: PageBlocksSection_Header;
}) => {
  return (
    <Container maxWidth="lg" data-tina-field={tinaField(data)}>
      <SectionTitle
        variant="h2"
        component="h2"
        data-tina-field={tinaField(data, "title")}
        align={data.align || "left"}
      >
        {data.title}
      </SectionTitle>
      {data.subtitle && (
        <SectionSubtitle
          variant="h5"
          component="p"
          color="text.secondary"
          data-tina-field={tinaField(data, "subtitle")}
          align={data.align || "left"}
        >
          {data.subtitle}
        </SectionSubtitle>
      )}
    </Container>
  );
};
