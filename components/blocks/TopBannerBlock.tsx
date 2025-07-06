"use client";
import { PageBlocksTop_banner } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

const PageHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const LogoImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "250px",
  height: "auto",
});

export const TopBannerBlock = ({ data }: { data: PageBlocksTop_banner }) => {
  return (
    <Container maxWidth="lg">
      <PageHeader>
        {data.logo?.src && (
          <LogoImage
            src={data.logo.src}
            alt={data.logo.alt || ""}
            data-tina-field={tinaField(data, "logo")}
          />
        )}
      </PageHeader>
    </Container>
  );
};
