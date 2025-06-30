"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAccessibility } from "@/context/AccessibilityContext";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { Box } from "@mui/material";

// calls the accessibility hook
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { activeTheme } = useAccessibility();

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box component="main" id="main-content" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
