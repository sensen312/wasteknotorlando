import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import "./globals.css";
import { AppWrapper } from "@/components/global/ClientWrappers";
import client from "@/tina/client";
import { notFound } from "next/navigation";

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
  const globalDataResult = await client.queries.global({
    relativePath: "index.mdx",
  });

  if (!globalDataResult.data.global) {
    console.error("Failed fechting global data check content/global/index.mdx");
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <SkipToContentLink />
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <AccessibilityProvider>
            <AppWrapper globalData={globalDataResult.data.global}>
              {children}
            </AppWrapper>
          </AccessibilityProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
