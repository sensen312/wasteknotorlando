import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import "./globals.css";
import { AppWrapper } from "@/components/global/ClientWrappers";
import client from "@/tina/client";
import { notFound } from "next/navigation";
import { Global } from "@/tina/__generated__/types";

export const metadata: Metadata = {
  title: "WasteKnotOrlando",
  description:
    "Connecting the Orlando community to reuse items and keep them out of landfills.",
};

const SkipToContentLink = () => (
  <a href="#main-content" className="skip-link">
    Skip to Main Content
  </a>
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalConnectionResult = await client.queries.globalConnection();

  const globalData = globalConnectionResult.data.globalConnection.edges?.[0]
    ?.node as Global;

  if (!globalData) {
    console.error(
      "Failed to fetch global data. Dude u need something in 'content/global'."
    );
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <SkipToContentLink />
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <AccessibilityProvider>
            <AppWrapper globalData={globalData}>{children}</AppWrapper>
          </AccessibilityProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
