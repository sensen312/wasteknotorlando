import client from "@/tina/client";
import { notFound } from "next/navigation";
import EventsPageClient from "./EventsPageClient";
import { Event } from "@/tina/__generated__/types";

export default async function EventsPage() {
  try {
    const pageResult = await client.queries.page({
      relativePath: "events.mdx",
    });

    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges
        ?.map((edge) => edge?.node)
        .filter((event): event is Event => !!event) || [];

    return <EventsPageClient pageData={pageResult} allEvents={allEvents} />;
  } catch (error) {
    console.error("Failed to fetch data for events page:", error);
    notFound();
  }
}
