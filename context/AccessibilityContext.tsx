"use client";

import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import {
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import originalBaseTheme from "@/theme/theme";

interface AccessibilityContextType {
  toggleHighContrast: () => void;
  isHighContrast: boolean;
  toggleDyslexicFont: () => void;
  isDyslexicFont: boolean;
  toggleReadingGuide: () => void;
  isReadingGuideEnabled: boolean;
  activeTheme: Theme;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
};

const highContrastTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#0A84FF", // We going with Blue for now
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00FFFF",
      contrastText: "#000000",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E0E0E0",
    },
  },
};

const dyslexicFontTheme: ThemeOptions = {
  typography: {
    fontFamily: '"OpenDyslexic", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('/wasteknotorlando/fonts/OpenDyslexic-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `,
    },
  },
};

const ReadingGuide = () => {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setTop(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="reading-guide" style={{ top: `${top}px` }} />;
};

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isReadingGuideEnabled, setIsReadingGuideEnabled] = useState(false);

  const toggleHighContrast = () => setIsHighContrast((prev) => !prev);
  const toggleDyslexicFont = () => setIsDyslexicFont((prev) => !prev);
  const toggleReadingGuide = () => setIsReadingGuideEnabled((prev) => !prev);

  const activeTheme = useMemo(() => {
    let newTheme = originalBaseTheme;
    if (isHighContrast) {
      newTheme = createTheme(deepmerge(newTheme, highContrastTheme));
    }
    if (isDyslexicFont) {
      newTheme = createTheme(deepmerge(newTheme, dyslexicFontTheme));
    }
    return responsiveFontSizes(newTheme);
  }, [isHighContrast, isDyslexicFont]);

  const contextValue = {
    toggleHighContrast,
    isHighContrast,
    toggleDyslexicFont,
    isDyslexicFont,
    toggleReadingGuide,
    isReadingGuideEnabled,
    activeTheme,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      {isReadingGuideEnabled && <ReadingGuide />}
    </AccessibilityContext.Provider>
  );
};
