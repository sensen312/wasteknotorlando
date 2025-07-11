"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAccessibility } from "@/context/AccessibilityContext";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTina } from "tinacms/dist/react";
import { GlobalQuery } from "@/tina/__generated__/types";

const RootBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const MainContent = styled(Box)({
  flexGrow: 1,
});

export const AppWrapper = (props: {
  children: React.ReactNode;
  data: GlobalQuery;
  variables: { relativePath: string };
  query: string;
}) => {
  const { data: liveData } = useTina(props);
  const { activeTheme } = useAccessibility();
  const globalData = liveData.global;

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <RootBox>
        <Header header={globalData.header} socials={globalData.socials} />
        <MainContent component="main" id="main-content">
          {props.children}
        </MainContent>
        <Footer footer={globalData.footer} socials={globalData.socials} />
      </RootBox>
    </ThemeProvider>
  );
};
