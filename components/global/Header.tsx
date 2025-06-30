"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
import {
  Menu as MenuIcon,
  Instagram,
  VolunteerActivism,
  AccessibilityNew,
} from "@mui/icons-material";
import NextLink from "next/link";
import Image from "next/image";
import { useAccessibility } from "@/context/AccessibilityContext";

// Abstraction for TinaCMS
const navItems = [
  { title: "Home", path: "/" },
  { title: "Events", path: "/events" },
  { title: "About", path: "/about" },
  { title: "Donate", path: "/donate" },
  { title: "Join Us", path: "/volunteer" },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const LogoLink = styled(MuiLink)({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  color: "inherit",
  textDecoration: "none",
});

const LogoImage = styled(Image)({
  objectFit: "contain",
});

const DesktopNavContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "center",
  },
}));

const DesktopIconsContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const MobileNavContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const MobileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: 250,
    borderRadius: 8,
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  whiteSpace: "nowrap",
}));

const Header = () => {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [accessibilityMenuAnchorEl, setAccessibilityMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const {
    toggleHighContrast,
    isHighContrast,
    toggleDyslexicFont,
    isDyslexicFont,
    toggleReadingGuide,
    isReadingGuideEnabled,
  } = useAccessibility();

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
          key={item.title}
          onClick={handleMobileMenuClose}
          component={NextLink}
          href={item.path}
        >
          <Typography textAlign="center">{item.title}</Typography>
        </MenuItem>
      ) : (
        <NavButton
          key={item.title}
          color="primary"
          component={NextLink}
          href={item.path}
        >
          {item.title}
        </NavButton>
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
    <StyledAppBar position="sticky" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LogoLink component={NextLink} href="/">
            <LogoImage
              src=" /wasteknotorlando/asset/namelogo.png"
              alt="WasteKnot Orlando Logo"
              width={180}
              height={40}
              priority
            />
          </LogoLink>

          {/* Desktop Nav*/}
          <DesktopNavContainer>
            <Stack component="nav" direction="row" spacing={1}>
              {renderNavLinks()}
            </Stack>
            <DesktopIconsContainer>
              <IconButton
                href="https://www.instagram.com/WasteKnotOrlando"
                color="primary"
                aria-label="Instagram"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7129"
                color="primary"
                aria-label="Zeffy"
              >
                <VolunteerActivism />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Accessibility Settings"
                onClick={handleAccessibilityMenuOpen}
              >
                <AccessibilityNew />
              </IconButton>
            </DesktopIconsContainer>
          </DesktopNavContainer>

          {/* Mobile Nav*/}
          <MobileNavContainer>
            <IconButton
              color="primary"
              aria-label="Accessibility Settings"
              onClick={handleAccessibilityMenuOpen}
            >
              <AccessibilityNew />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="open menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </MobileNavContainer>

          {/*Sandwich for mobile*/}
          <MobileMenu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {renderNavLinks(true)}
            <MenuItem
              component="a"
              href="https://www.instagram.com/WasteKnotOrlando"
            >
              <IconButton color="primary">
                <Instagram />
              </IconButton>
              <Typography>Instagram</Typography>
            </MenuItem>
            <MenuItem
              component="a"
              href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7129"
            >
              <IconButton color="primary">
                <VolunteerActivism />
              </IconButton>
              <Typography>Zeffy</Typography>
            </MenuItem>
          </MobileMenu>
          {accessibilityMenu}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
