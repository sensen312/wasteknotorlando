import client from "@/tina/client";
import { notFound } from "next/navigation";
import EventsPageClient from "./EventsPageClient";

export default async function EventsPage() {
  try {
    const pageResult = await client.queries.page({
      relativePath: "events.mdx",
    });

    const eventsResult = await client.queries.eventConnection();

    return <EventsPageClient pageData={pageResult} eventsData={eventsResult} />;
  } catch (error) {
    console.error("Failed to fetch data for events page:", error);
    notFound();
  }
}
