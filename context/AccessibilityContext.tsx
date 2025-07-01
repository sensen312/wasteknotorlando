"use client";

import React, {
  createContext,
  useMemo,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";
import {
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import originalBaseTheme from "@/theme/theme";

function getLocalStorageItem(key: string) {
  // makes sure its from local storage
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
}

function setLocalStorageItem(key: string, value: any) {
  if (typeof window === "undefined") {
    console.warn(`Tried setting localStorage key “${key}” on the server ;-;`);
    return;
  }
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event("storage"));
}

// makes react re-render component with new value
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

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
    fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
    h2: { fontFamily: '"OpenDyslexic", "Hccesselvetica", "Arial", sans-serif' },
    h3: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
    h4: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
    h5: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
    h6: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
    body1: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
    body2: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
    button: { fontFamily: '"OpenDyslexic", "Helvetica", "Arial", sans-serif' },
  },
};

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // synchronously reads the value from localStorage
  const isHighContrast = useSyncExternalStore(
    subscribe,
    () => JSON.parse(getLocalStorageItem("isHighContrast") || "false"),
    () => false
  );
  const isDyslexicFont = useSyncExternalStore(
    subscribe,
    () => JSON.parse(getLocalStorageItem("isDyslexicFont") || "false"),
    () => false
  );
  const isReadingGuideEnabled = useSyncExternalStore(
    subscribe,
    () => JSON.parse(getLocalStorageItem("isReadingGuideEnabled") || "false"),
    () => false
  );

  // now we directly write to local storage
  const toggleHighContrast = useCallback(() => {
    setLocalStorageItem("isHighContrast", !isHighContrast);
  }, [isHighContrast]);

  const toggleDyslexicFont = useCallback(() => {
    setLocalStorageItem("isDyslexicFont", !isDyslexicFont);
  }, [isDyslexicFont]);

  const toggleReadingGuide = useCallback(() => {
    setLocalStorageItem("isReadingGuideEnabled", !isReadingGuideEnabled);
  }, [isReadingGuideEnabled]);

  const activeTheme = useMemo(() => {
    let themeOptions: ThemeOptions = {};
    if (isHighContrast) {
      themeOptions = deepmerge(themeOptions, highContrastTheme);
    }
    if (isDyslexicFont) {
      themeOptions = deepmerge(themeOptions, dyslexicFontTheme);
    }
    const newTheme = createTheme(deepmerge(originalBaseTheme, themeOptions));
    return responsiveFontSizes(newTheme);
  }, [isHighContrast, isDyslexicFont]);

  const ReadingGuide = () => {
    const [top, setTop] = React.useState(0);
    React.useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => setTop(event.clientY);
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
    return <div className="reading-guide" style={{ top: `${top}px` }} />;
  };

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
