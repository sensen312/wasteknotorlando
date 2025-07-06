"use client";
import React, { useState, useRef } from "react";
import { PageBlocksQuick_links } from "@/tina/__generated__/types";
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

const WorkWithUsContainer = styled(Box)(({ theme }) => ({
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
  cursor: "pointer",
  "&:hover, &:focus-within": {
    transform: "translateY(-4px) scale(1.02)",
    borderColor: alpha(theme.palette.primary.main, 0.5),
    boxShadow: theme.shadows[4],
  },
}));

const HoverContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
  zIndex: 1,
});

const SubLink = styled("a")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  width: "100%",
  textDecoration: "none",
  color: theme.palette.primary.main,
  transition: "background-color 0.2s ease",
  "&:hover, &:focus": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
    outline: "none",
  },
  "&:first-of-type": {
    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
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
  const Icon = (Icons as Record<string, MuiIcon>)[iconName];
  return Icon ? <Icon fontSize="large" /> : null;
};

const WorkWithUsLink = ({
  data,
}: {
  data: PageBlocksQuick_links["workWithUs"];
}) => {
  const [isFocusedOrHovered, setIsFocusedOrHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const subLinks = [
    { title: "Collaborate", href: data?.collaborateLink },
    { title: "Volunteer", href: data?.volunteerLink },
  ];

  const handleFocus = () => setIsFocusedOrHovered(true);
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsFocusedOrHovered(false);
    }
  };

  return (
    <WorkWithUsContainer
      ref={containerRef}
      onMouseEnter={() => setIsFocusedOrHovered(true)}
      onMouseLeave={() => setIsFocusedOrHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="group"
      data-tina-field={tinaField(data!)}
    >
      {isFocusedOrHovered ? (
        <HoverContentWrapper>
          {subLinks.map((item, index) => (
            <SubLink
              key={item.title}
              href={item.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              data-tina-field={tinaField(
                data!,
                index === 0 ? "collaborateLink" : "volunteerLink"
              )}
            >
              <Typography variant="h6" component="span">
                {item.title}
              </Typography>
            </SubLink>
          ))}
        </HoverContentWrapper>
      ) : (
        <>
          <Icons.People fontSize="large" />
          <LinkTitle variant="h4">Work With Us</LinkTitle>
        </>
      )}
    </WorkWithUsContainer>
  );
};

export const QuickLinksBlock = ({ data }: { data: PageBlocksQuick_links }) => {
  return (
    <Container maxWidth="lg">
      <KeyLinksWrapper>
        <KeyLinksFlexContainer>
          {data.links?.map((item) => (
            <StyledKeyLinkButton
              key={item?.title}
              href={item?.href || "#"}
              variant="outlined"
              color="primary"
              data-tina-field={tinaField(item!, "title")}
              {...(item?.href?.startsWith("http")
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    component: "a",
                  }
                : { component: NextLink })}
            >
              {item?.icon && getIcon(item.icon)}
              <LinkTitle variant="h4">{item?.title}</LinkTitle>
            </StyledKeyLinkButton>
          ))}
          {data.workWithUs && <WorkWithUsLink data={data.workWithUs} />}
        </KeyLinksFlexContainer>
      </KeyLinksWrapper>
    </Container>
  );
};
