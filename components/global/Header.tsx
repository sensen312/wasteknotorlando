"use client";
import React, { useState, useRef, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import NextLink from "next/link";
import Image from "next/image";
import { useAccessibility } from "@/context/AccessibilityContext";
import { GlobalHeader, GlobalSocials, Maybe } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  boxShadow: "none",
}));
const LogoLink = styled(MuiLink)({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  color: "inherit",
  textDecoration: "none",
});
const LogoImage = styled(Image)({ objectFit: "contain" });
const DesktopNavContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: { display: "flex", alignItems: "center" },
}));
const DesktopIconsContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));
const MobileNavContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: { display: "none" },
}));
const MobileMenu = styled(Menu)({
  "& .MuiPaper-root": { width: "100%", maxWidth: 250, borderRadius: 8 },
});
const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  whiteSpace: "nowrap",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.hover, 0.7),
    boxShadow: `0 2px 5px ${alpha(theme.palette.common.black, 0.15)}`,
  },
}));

type MuiIcon = React.ComponentType<{
  fontSize?: "small" | "inherit" | "large" | "medium";
}>;

const getIcon = (iconName: string): React.ReactNode => {
  if (!iconName) return null;
  const Icon = (Icons as Record<string, MuiIcon>)[iconName];
  return Icon ? <Icon /> : null;
};

export default function Header({
  header,
  socials,
}: {
  header: GlobalHeader;
  socials: Maybe<Maybe<GlobalSocials>[]>;
}) {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [accessibilityMenuAnchorEl, setAccessibilityMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const {
    toggleHighContrast,
    isHighContrast,
    toggleDyslexicFont,
    isDyslexicFont,
    toggleReadingGuide,
    isReadingGuideEnabled,
  } = useAccessibility();
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const navItems = header.navLinks || [];

  useEffect(() => {
    if (isMobileMenuOpen) {
      const firstMenuItem =
        mobileMenuRef.current?.querySelector('[role="menuitem"]');
      (firstMenuItem as HTMLElement)?.focus();
    }
  }, [isMobileMenuOpen]);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setMobileMenuAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchorEl(null);
  const handleAccessibilityMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAccessibilityMenuAnchorEl(event.currentTarget);
  const handleAccessibilityMenuClose = () => setAccessibilityMenuAnchorEl(null);

  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) =>
      isMobile ? (
        <MenuItem
          key={item?.title}
          onClick={handleMobileMenuClose}
          component={NextLink}
          href={item?.path || "#"}
          data-tina-field={tinaField(item!)}
        >
          <Typography textAlign="center">{item?.title}</Typography>
        </MenuItem>
      ) : (
        <NavButton
          key={item?.title}
          variant="contained"
          color="primary"
          component={NextLink}
          href={item?.path || "#"}
          data-tina-field={tinaField(item!)}
          disableElevation
        >
          {item?.title}
        </NavButton>
      )
    );

  const renderSocials = (isMobile = false) =>
    socials?.map(
      (social) =>
        social &&
        social.url && (
          <React.Fragment key={social.platform}>
            {isMobile ? (
              <MenuItem
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton color="primary" aria-label={social.platform || ""}>
                  {getIcon(social.icon || "")}
                </IconButton>
                <Typography>{social.platform}</Typography>
              </MenuItem>
            ) : (
              <IconButton
                href={social.url}
                color="primary"
                aria-label={social.platform || ""}
                target="_blank"
                rel="noopener noreferrer"
                data-tina-field={tinaField(social)}
              >
                {getIcon(social.icon || "")}
              </IconButton>
            )}
          </React.Fragment>
        )
    );

  const accessibilityMenu = (
    <Menu
      anchorEl={accessibilityMenuAnchorEl}
      open={Boolean(accessibilityMenuAnchorEl)}
      onClose={handleAccessibilityMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem>
        <FormControlLabel
          control={
            <Switch checked={isHighContrast} onChange={toggleHighContrast} />
          }
          label="High Contrast"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Switch checked={isDyslexicFont} onChange={toggleDyslexicFont} />
          }
          label="Dyslexia-Friendly Font"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Switch
              checked={isReadingGuideEnabled}
              onChange={toggleReadingGuide}
            />
          }
          label="Reading Guide"
        />
      </MenuItem>
    </Menu>
  );

  return (
    <StyledAppBar position="sticky" data-tina-field={tinaField(header)}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LogoLink component={NextLink} href="/">
            {header.logo && (
              <LogoImage
                src={header.logo.src}
                alt={header.logo.alt}
                width={180}
                height={40}
                priority
                data-tina-field={tinaField(header, "logo")}
              />
            )}
          </LogoLink>
          <DesktopNavContainer>
            <Stack
              component="nav"
              direction="row"
              spacing={1}
              data-tina-field={tinaField(header, "navLinks")}
            >
              {renderNavLinks()}
            </Stack>
            <DesktopIconsContainer data-tina-field={tinaField(socials)}>
              {renderSocials()}
              <IconButton
                color="primary"
                aria-label="Accessibility Settings"
                onClick={handleAccessibilityMenuOpen}
              >
                <Icons.AccessibilityNew />
              </IconButton>
            </DesktopIconsContainer>
          </DesktopNavContainer>
          <MobileNavContainer>
            <IconButton
              color="primary"
              aria-label="Accessibility Settings"
              onClick={handleAccessibilityMenuOpen}
            >
              <Icons.AccessibilityNew />
            </IconButton>
            <IconButton
              ref={mobileMenuButtonRef}
              size="large"
              edge="end"
              color="primary"
              aria-label="open menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <Icons.Menu />
            </IconButton>
          </MobileNavContainer>
          <MobileMenu
            id="mobile-menu"
            ref={mobileMenuRef}
            anchorEl={mobileMenuAnchorEl}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {renderNavLinks(true)}
            {renderSocials(true)}
          </MobileMenu>
          {accessibilityMenu}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
