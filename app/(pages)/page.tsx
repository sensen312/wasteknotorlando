import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "./[...slug]/PageClient";
import { Event } from "@/tina/__generated__/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const siteURL = "https://www.wasteknotorlando.org";
  const siteName = "WasteKnot Orlando";

  try {
    const homePageResult = await client.queries.page({
      relativePath: "home.mdx",
    });
    const page = homePageResult.data.page;

    const seo = page.seo;
    const pageTitle = seo?.title || page.title || siteName;
    const pageDescription =
      seo?.description ||
      "Connecting the Orlando community to reuse items and keep them out of landfills.";

    return {
      title: pageTitle === siteName ? siteName : `${pageTitle} | ${siteName}`,
      description: pageDescription,
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: siteURL,
      },
    };
  } catch (error) {
    console.error("Failed generating metadata for home page ;-;", error);
    return {
      title: siteName,
      description:
        "Connecting the Orlando community to reuse items and keep them out of landfills.",
    };
  }
}

export default async function HomePage() {
  try {
    const homePageResult = await client.queries.page({
      relativePath: "home.mdx",
    });

    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges
        ?.map((edge) => edge?.node)
        .filter((event): event is Event => !!event) || [];

    return (
      <PageClient
        data={homePageResult.data}
        variables={homePageResult.variables}
        query={homePageResult.query}
        allEvents={allEvents}
      />
    );
  } catch (error) {
    console.error("Failed to fetch homepage at build ;-;", error);
    notFound();
  }
}
