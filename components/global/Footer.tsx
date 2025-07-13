import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  IconButton,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { GlobalFooter, GlobalSocials, Maybe } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import NextLink from "next/link";

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
  gap: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
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

const ContactItemsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
  },
}));

const ContactItemLabel = styled("span")({
  fontWeight: "bold",
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
          <FooterSection data-tina-field={tinaField(footer, "logo")}>
            {footer.logo && (
              <LogoNameImage src={footer.logo.src} alt={footer.logo.alt} />
            )}
          </FooterSection>

          {footer.blocks?.map((block, i) => {
            if (!block) return null;
            const itemTinaField = tinaField(block);

            switch (block.__typename) {
              case "GlobalFooterBlocksFooter_contact":
                return (
                  <FooterSection key={i} data-tina-field={itemTinaField}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      data-tina-field={tinaField(block, "header")}
                    >
                      {block.header}
                    </Typography>
                    <ContactItemsContainer
                      data-tina-field={tinaField(block, "contact_items")}
                    >
                      {block.contact_items?.map((item, j) => {
                        if (!item) return null;

                        let renderedValue;
                        switch (item.item_type) {
                          case "Email":
                            renderedValue = (
                              <MuiLink
                                href={`mailto:${item.value}`}
                                color="inherit"
                              >
                                {item.value}
                              </MuiLink>
                            );
                            break;
                          case "Phone":
                            renderedValue = (
                              <MuiLink
                                href={`tel:${item.value}`}
                                color="inherit"
                              >
                                {item.value}
                              </MuiLink>
                            );
                            break;
                          case "Text":
                          default:
                            renderedValue = (
                              <Typography variant="body2" component="span">
                                {item.value}
                              </Typography>
                            );
                        }

                        return (
                          <Typography
                            key={j}
                            variant="body2"
                            component="div"
                            data-tina-field={tinaField(item)}
                          >
                            <ContactItemLabel>{item.label}:</ContactItemLabel>{" "}
                            {renderedValue}
                          </Typography>
                        );
                      })}
                    </ContactItemsContainer>
                  </FooterSection>
                );

              case "GlobalFooterBlocksFooter_links":
                return (
                  <FooterSection key={i} data-tina-field={itemTinaField}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      data-tina-field={tinaField(block, "header")}
                    >
                      {block.header}
                    </Typography>
                    <Box
                      component="nav"
                      data-tina-field={tinaField(block, "links")}
                    >
                      {block.links?.map((link, j) =>
                        link ? (
                          <MuiLink
                            key={j}
                            component={NextLink}
                            href={link.url || "#"}
                            color="inherit"
                            display="block"
                            data-tina-field={tinaField(link)}
                          >
                            {link.text}
                          </MuiLink>
                        ) : null
                      )}
                    </Box>
                  </FooterSection>
                );

              case "GlobalFooterBlocksFooter_text":
                return (
                  <FooterSection key={i} data-tina-field={itemTinaField}>
                    <Box data-tina-field={tinaField(block, "body")}>
                      <TinaMarkdown content={block.body} />
                    </Box>
                  </FooterSection>
                );

              default:
                return null;
            }
          })}

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
