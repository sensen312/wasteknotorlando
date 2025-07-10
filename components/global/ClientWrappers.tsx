"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAccessibility } from "@/context/AccessibilityContext";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Global as Settings } from "@/tina/__generated__/types";

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
  globalData,
}: {
  children: React.ReactNode;
  globalData: Settings;
}) => {
  const { activeTheme } = useAccessibility();

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <RootBox>
        <Header header={globalData.header} socials={globalData.socials} />
        <MainContent component="main" id="main-content">
          {children}
        </MainContent>
        <Footer footer={globalData.footer} socials={globalData.socials} />
      </RootBox>
    </ThemeProvider>
  );
};
