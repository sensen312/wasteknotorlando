import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import "./globals.css";
import { AppWrapper } from "@/components/global/ClientWrappers";
import client from "@/tina/client";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const siteURL = "https://www.wasteknotorlando.org";
  const siteName = "WasteKnot Orlando";
  const description =
    "Connecting the Orlando community to reuse items and keep them out of landfills.";
  const iconPath = "/icon.png";

  return {
    metadataBase: new URL(siteURL),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: description,
    icons: {
      icon: iconPath,
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: {
        default: siteName,
        template: `%s | ${siteName}`,
      },
      description: description,
      url: siteURL,
      siteName: siteName,
      images: [
        {
          url: iconPath,
          width: 452,
          height: 452,
          alt: `${siteName} Logo`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

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
