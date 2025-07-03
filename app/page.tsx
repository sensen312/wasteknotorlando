"use client";
import React, { useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { FavoriteBorder, Event, People, Email } from "@mui/icons-material";
import NextLink from "next/link";

const PageHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0, 2, 0),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const LogoImage = styled("img")({
  maxWidth: "100%",
  height: "auto",
});

const SectionHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(3),
  position: "relative",
  paddingBottom: theme.spacing(1),
  "&::after": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: theme.palette.secondary.main,
    bottom: 0,
    left: "calc(50% - 40px)",
  },
}));

const BannerCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "200px",
  [theme.breakpoints.up("md")]: {
    height: "300px",
  },
}));

const BannerActionArea = styled(CardActionArea)({
  height: "100%",
});

const BannerImage = styled(CardMedia)({
  height: "100%",
  objectFit: "cover",
});

const BannerOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 57, 38, 0.5)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  padding: theme.spacing(3),
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 57, 38, 0.7)",
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));

const BannerTitle = styled(Typography)({
  textShadow: "1px 1px 20px rgba(0,0,0,0.7)",
});

const BannerSubtitle = styled(Typography)({
  textShadow: "1px 1px 10px rgba(0,0,0,0.8)",
});

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

// CHECK ON MOBILE!
const FeaturedEventBanner = () => (
  <Box my={5}>
    <SectionHeader variant="h2" component="h2">
      Upcoming Event
    </SectionHeader>
    <BannerCard>
      <BannerActionArea
        component={NextLink}
        href="/events/event-one-slug"
        aria-label="Link to Recycled Horrors Art Workshop event page"
      >
        <BannerImage
          component="img"
          image="/wasteknotorlando/assets/RecycledHorrorsArtWorkShop.jpg"
          alt="Recycled Horror Workshop"
        />
        <BannerOverlay>
          <BannerTitle variant="h3" component="h3" gutterBottom>
            Recycled Horrors Workshop
          </BannerTitle>
          <BannerSubtitle variant="h5" component="p">
            Make your own upcycled piece of art!
          </BannerSubtitle>
        </BannerOverlay>
      </BannerActionArea>
    </BannerCard>
  </Box>
);

const WorkWithUsLink = () => {
  const [isFocusedOrHovered, setIsFocusedOrHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const subLinks = [
    {
      title: "Collaborate",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSeej1Glaa2H3-PQ8qPozjt1JzlJIDypXYErEFfCU82Gwpc54w/viewform",
    },
    {
      title: "Volunteer",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSf1y-mvwEEvMLg1hZsB125j-jv30bYCM01X6e2TbzhGLS5F0A/viewform",
    },
  ];

  const handleFocus = () => {
    setIsFocusedOrHovered(true);
  };

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
    >
      {isFocusedOrHovered ? (
        <HoverContentWrapper>
          {subLinks.map((item) => (
            <SubLink
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="h6" component="span">
                {item.title}
              </Typography>
            </SubLink>
          ))}
        </HoverContentWrapper>
      ) : (
        <>
          <People fontSize="large" />
          <Typography variant="h4" sx={{ mt: 1, fontSize: "1.25rem" }}>
            Work With Us
          </Typography>
        </>
      )}
    </WorkWithUsContainer>
  );
};

const KeyLinks = () => {
  const linkItems = [
    {
      title: "Donate",
      href: "/donate",
      icon: <FavoriteBorder fontSize="large" />,
    },
    {
      title: "Events",
      href: "/events",
      icon: <Event fontSize="large" />,
    },
    {
      title: "Mailing List",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSeTAtF6jXzdXoA0RCb6_RdqDplBUmPTS7wBHKCVYZkmoGfAHw/viewform",
      icon: <Email fontSize="large" />,
    },
  ];

  return (
    <KeyLinksWrapper>
      <KeyLinksFlexContainer>
        {linkItems.map((item) => (
          <StyledKeyLinkButton
            key={item.title}
            href={item.href}
            variant="outlined"
            color="primary"
            {...(item.title === "Mailing List"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : { component: NextLink })}
          >
            {item.icon}
            <Typography variant="h4" sx={{ mt: 1, fontSize: "1.25rem" }}>
              {item.title}
            </Typography>
          </StyledKeyLinkButton>
        ))}
        <WorkWithUsLink />
      </KeyLinksFlexContainer>
    </KeyLinksWrapper>
  );
};

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <PageHeader>
        <LogoImage
          src="/wasteknotorlando/assets/biglogo.png"
          alt="WasteKnot Orlando Logo"
        />
      </PageHeader>
      <FeaturedEventBanner />
      <KeyLinks />
    </Container>
  );
}
