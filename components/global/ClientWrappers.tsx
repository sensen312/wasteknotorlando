"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAccessibility } from "@/context/AccessibilityContext";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Settings } from "@/tina/__generated__/types";

const RootBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const MainContent = styled(Box)({
  flexGrow: 1,
});

export const AppWrapper = ({
  children,
  settingsData,
}: {
  children: React.ReactNode;
  settingsData: Settings;
}) => {
  const { activeTheme } = useAccessibility();

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <RootBox>
        <Header header={settingsData.header} socials={settingsData.socials} />
        <MainContent component="main" id="main-content">
          {children}
        </MainContent>
        <Footer footer={settingsData.footer} socials={settingsData.socials} />
      </RootBox>
    </ThemeProvider>
  );
};
