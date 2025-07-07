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
import { GlobalFooter, GlobalSocials } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
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
});

const FooterLink = styled(MuiLink)({
  color: "inherit",
  display: "block",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Footer = ({
  footer,
  socials,
}: {
  footer: GlobalFooter;
  socials: GlobalSocials;
}) => {
  return (
    <FooterContainer component="footer" data-tina-field={tinaField(footer)}>
      <Container maxWidth="lg">
        <FooterLayoutContainer>
          <FooterSection>
            {footer.logo && (
              <LogoNameImage
                src={footer.logo.src}
                alt={footer.logo.alt}
                data-tina-field={tinaField(footer, "logo")}
              />
            )}
          </FooterSection>

          <FooterSection>
            <SectionHeader variant="h5" component="h3">
              Contacts:
            </SectionHeader>
            <FooterLink
              href={`mailto:${footer.contactEmail}`}
              data-tina-field={tinaField(footer, "contactEmail")}
            >
              {footer.contactEmail}
            </FooterLink>
          </FooterSection>

          <FooterSection>
            <SectionHeader variant="h5" component="h3">
              Our socials
            </SectionHeader>
            <Box data-tina-field={tinaField(socials)}>
              {socials.instagramUrl && (
                <IconButton
                  href={socials.instagramUrl}
                  color="inherit"
                  aria-label="Instagram"
                  data-tina-field={tinaField(socials, "instagramUrl")}
                >
                  <Instagram />
                </IconButton>
              )}
              {socials.donationUrl && (
                <IconButton
                  href={socials.donationUrl}
                  color="inherit"
                  aria-label="Zeffy"
                  data-tina-field={tinaField(socials, "donationUrl")}
                >
                  <VolunteerActivism />
                </IconButton>
              )}
            </Box>
          </FooterSection>
        </FooterLayoutContainer>
        {/* Do we need a copyright desc here? */}
      </Container>
    </FooterContainer>
  );
};

export default Footer;
