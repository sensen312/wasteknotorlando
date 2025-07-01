"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import { Instagram, VolunteerActivism } from "@mui/icons-material";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.custom.offBlack,
  padding: theme.spacing(6, 0),
  marginTop: "auto",
}));

const FooterLayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    textAlign: "center",
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LogoNameImage = styled("img")({
  width: "100%",
  maxWidth: "280px",
  height: "auto",
  // is this readable?
  /*
  filter: `
      drop-shadow(0px 0px 1px rgba(198, 211, 204, 0.7))
      drop-shadow(0px 0px 8px rgba(36, 90, 48, 0.3))
    `,
  */
});

const FooterLink = styled(MuiLink)({
  color: "inherit",
  display: "block",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Footer = () => (
  <FooterContainer component="footer">
    <Container maxWidth="lg">
      <FooterLayoutContainer>
        <FooterSection>
          <LogoNameImage
            src={"/wasteknotorlando/assets/logoinsidename.png"}
            alt={"WasteKnot Orlando Logo"}
          />
        </FooterSection>

        <FooterSection>
          <SectionHeader variant="h5" component="h3">
            Contacts:
          </SectionHeader>
          <FooterLink href="mailto:wasteknotorlando@gmail.com">
            wasteknotorlando@gmail.com
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionHeader variant="h5" component="h3">
            Our socials
          </SectionHeader>
          <Box>
            <IconButton
              href="https://www.instagram.com/WasteKnotOrlando"
              color="inherit"
              aria-label="Instagram"
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7129"
              color="inherit"
              aria-label="Zeffy"
            >
              <VolunteerActivism />
            </IconButton>
          </Box>
        </FooterSection>
      </FooterLayoutContainer>
      {/* Do we need a copyright desc here? */}
    </Container>
  </FooterContainer>
);

export default Footer;
