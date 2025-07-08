import client from "@/tina/client";
import { notFound } from "next/navigation";
import EventsPageClient from "./EventsPageClient";
import { Event, PageBlocksEvents_listing } from "@/tina/__generated__/types";

export default async function EventsPage() {
  try {
    const pageResult = await client.queries.page({
      relativePath: "events.mdx",
    });

    const eventsListingBlock = pageResult.data.page.blocks?.find(
      (block): block is PageBlocksEvents_listing =>
        block?.__typename === "PageBlocksEvents_listing"
    );

    const curatedEvents =
      eventsListingBlock?.events
        ?.map((item) => item?.event)
        .filter((event): event is Event => !!event) || [];

    return <EventsPageClient pageData={pageResult} allEvents={curatedEvents} />;
  } catch (error) {
    console.error("Failed to fetch data for events page:", error);
    notFound();
  }
}
