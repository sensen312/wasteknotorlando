"use client";
import React from "react";
import { styled } from "@mui/material/styles";
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

const BannerCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "250px",
  [theme.breakpoints.up("md")]: {
    height: "400px",
  },
}));

const BannerActionArea = styled(CardActionArea)({
  height: "100%",
});

const BannerImage = styled(CardMedia)({
  height: "100%",
  objectFit: "contain",
});

const BannerOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(25, 71, 38, 0.4)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5),
  },
}));

const BannerTitle = styled(Typography)({
  textShadow: "2px 1px 30px rgb(5, 41, 12)",
});

const BannerSubtitle = styled(Typography)({
  textShadow: "1px 1px 12px rgba(0,0,0,1)",
});

const KeyLinksWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
  marginTop: theme.spacing(6),
}));

const KeyLinksFlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
}));

const StyledKeyLinkButton = styled(Button)(({ theme }) => ({
  border: "2px solid",
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  height: 120,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 4,
  transition: "all 0.3s ease",
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    width: "60%",
  },
  [theme.breakpoints.up("md")]: {
    width: 200,
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    transform: "scale(1.05)",
    borderColor: theme.palette.secondary.main,
    border: "2px solid",
  },
}));

// CHECK ON MOBILE!
// Might Make this a link to the event page itself
const FeaturedEventBanner = () => (
  <Box my={5}>
    <BannerCard>
      <BannerActionArea href="https://www.zeffy.com/en-US/ticketing/81825-recycled-horrors-art-workshop">
        <BannerImage
          component="img"
          image="/wasteknotorlando/asset/RecycledHorrorsArtWorkShop.jpg"
          alt="Recycled Horror Workshop"
        />
        <BannerOverlay>
          <BannerTitle variant="h3" component="h2" gutterBottom>
            Recycled Horror Workshop
          </BannerTitle>
          <BannerSubtitle variant="h4" component="p">
            Make your own upcycled piece of art!
          </BannerSubtitle>
        </BannerOverlay>
      </BannerActionArea>
    </BannerCard>
  </Box>
);

const KeyLinks = () => {
  const linkItems = [
    {
      title: "Donate",
      href: "/donate",
      icon: <FavoriteBorder fontSize="large" />,
    },
    { title: "Events", href: "/events", icon: <Event fontSize="large" /> },
    {
      title: "Work With Us",
      href: "/volunteer",
      icon: <People fontSize="large" />,
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
          >
            {item.icon}
            <Typography variant="h4" sx={{ mt: 1, fontSize: "1.25rem" }}>
              {item.title}
            </Typography>
          </StyledKeyLinkButton>
        ))}
      </KeyLinksFlexContainer>
    </KeyLinksWrapper>
  );
};

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <FeaturedEventBanner />
      <KeyLinks />
    </Container>
  );
}
