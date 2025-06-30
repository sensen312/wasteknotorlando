import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import "./globals.css";
import { AppWrapper } from "@/components/global/ClientWrappers";

export const metadata: Metadata = {
  title: "WasteKnotOrlando",
  description:
    "Connecting the Orlando community to reuse items and keep them out of landfills.",
};

// Should work
const SkipToContentLink = () => (
  <a href="#main-content" className="skip-link">
    Skip to Main Content
  </a>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SkipToContentLink />
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <AccessibilityProvider>
            <AppWrapper>{children}</AppWrapper>
          </AccessibilityProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
