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
import * as Icons from "@mui/icons-material";
import { GlobalFooter, GlobalSocials, Maybe } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { BlockRenderer } from "../blocks/BlockRenderer";

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

const LogoNameImage = styled("img")({
  width: "100%",
  maxWidth: "280px",
  height: "auto",
});

const FooterSocialsSection = styled(FooterSection)({
  minWidth: "150px",
});

type MuiIcon = React.ComponentType<{
  fontSize?: "small" | "inherit" | "large" | "medium";
}>;

const getIcon = (iconName: string): React.ReactNode => {
  if (!iconName) return null;
  const Icon = (Icons as Record<string, MuiIcon>)[iconName];
  return Icon ? <Icon /> : null;
};

const Footer = ({
  footer,
  socials,
}: {
  footer: GlobalFooter;
  socials: Maybe<Maybe<GlobalSocials>[]>;
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

          {footer.blocks && <BlockRenderer blocks={footer.blocks as any} />}

          <FooterSocialsSection>
            <Box data-tina-field={tinaField(socials)}>
              {socials?.map(
                (social) =>
                  social &&
                  social.url && (
                    <IconButton
                      key={social.platform}
                      href={social.url}
                      color="inherit"
                      aria-label={social.platform || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-tina-field={tinaField(social)}
                    >
                      {getIcon(social.icon || "")}
                    </IconButton>
                  )
              )}
            </Box>
          </FooterSocialsSection>
        </FooterLayoutContainer>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
