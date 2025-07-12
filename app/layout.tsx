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
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
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
  const globalQueryResult = await client.queries.global({
    relativePath: "index.mdx",
  });

  if (!globalQueryResult.data.global) {
    console.error(
      "Failed to fetch global data. Dude you need index.mdx in 'content/global'."
    );
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <SkipToContentLink />
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <AccessibilityProvider>
            <AppWrapper
              data={globalQueryResult.data}
              query={globalQueryResult.query}
              variables={globalQueryResult.variables}
            >
              {children}
            </AppWrapper>
          </AccessibilityProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
