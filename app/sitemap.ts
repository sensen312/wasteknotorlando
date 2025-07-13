import { MetadataRoute } from "next";
import client from "@/tina/client";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.wasteknotorlando.org";

  const staticPages = ["", "/events", "/about", "/donate", "/volunteer"];

  const staticPageEntries = staticPages.map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1.0 : 0.8, // home page priority
  }));

  const eventsResult = await client.queries.eventConnection();
  const eventEntries = eventsResult.data.eventConnection.edges
    ?.map((edge) => {
      if (!edge?.node || edge.node.is_archived) return null;
      return {
        url: `${siteUrl}/events/${edge.node._sys.filename}`,
        lastModified: edge.node.date ? new Date(edge.node.date) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return [...staticPageEntries, ...(eventEntries || [])];
}
