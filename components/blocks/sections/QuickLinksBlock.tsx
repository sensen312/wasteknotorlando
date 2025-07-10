"use client";
import React from "react";
import { PageBlocksQuick_Links } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { styled, alpha } from "@mui/material/styles";
import { Box, Typography, Button, Container } from "@mui/material";
import * as Icons from "@mui/icons-material";
import NextLink from "next/link";

const KeyLinksWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
  marginTop: theme.spacing(8),
}));

const KeyLinksFlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
}));

const StyledKeyLinkButton = styled(Button)(({ theme }) => ({
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  color: theme.palette.primary.main,
  height: 150,
  width: "clamp(200px, 30vw, 250px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.3s ease",
  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px) scale(1.02)",
    borderColor: alpha(theme.palette.primary.main, 0.5),
    boxShadow: theme.shadows[4],
  },
}));

const LinkTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontSize: "1.25rem",
}));

type MuiIcon = React.ComponentType<{
  fontSize?: "small" | "inherit" | "large" | "medium";
}>;

const getIcon = (iconName: string) => {
  if (!iconName) return null;
  const Icon = (Icons as Record<string, MuiIcon>)[iconName];
  return Icon ? <Icon fontSize="large" /> : null;
};

export const QuickLinksBlock = ({ data }: { data: PageBlocksQuick_Links }) => {
  return (
    <Container maxWidth="lg">
      <KeyLinksWrapper>
        <KeyLinksFlexContainer>
          {data.links?.map((item, index) =>
            item ? (
              <StyledKeyLinkButton
                key={`${item.title}-${index}`}
                href={item.href || "#"}
                variant="outlined"
                color="primary"
                data-tina-field={tinaField(item)}
                {...(item.href?.startsWith("http")
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                      component: "a",
                    }
                  : { component: NextLink })}
              >
                {getIcon(item.icon!)}
                <LinkTitle variant="h4">{item.title}</LinkTitle>
              </StyledKeyLinkButton>
            ) : null
          )}
        </KeyLinksFlexContainer>
      </KeyLinksWrapper>
    </Container>
  );
};
