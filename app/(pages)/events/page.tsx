import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "../[...slug]/PageClient";
import { Event } from "@/tina/__generated__/types";

export default async function EventsPage() {
  try {
    const pageResult = await client.queries.page({
      relativePath: "events.mdx",
    });

    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges?.map((edge) => edge.node) || [];

    return (
      <PageClient
        data={pageResult.data}
        variables={pageResult.variables}
        query={pageResult.query}
        allEvents={allEvents as Event[]}
      />
    );
  } catch (error) {
    console.error("Failed to fetch events page data:", error);
    notFound();
  }
}
