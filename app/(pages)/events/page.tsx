import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "./[...slug]/PageClient";
import { Event } from "@/tina/__generated__/types";

export default async function HomePage() {
  try {
    const res = await client.queries.page({
      relativePath: "home.mdx",
    });

    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges?.map((edge) => edge.node) || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mostUpcomingEvent = allEvents
      .map((event) => ({ ...event, dateObj: new Date(event.date) }))
      .filter((event) => event.dateObj >= today)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())[0];

    return (
      <PageClient
        data={res.data}
        variables={res.variables}
        query={res.query}
        allEvents={allEvents as Event[]}
        mostUpcomingEvent={mostUpcomingEvent || null}
      />
    );
  } catch (error) {
    console.error("Failed to fetch homepage. ;-;", error);
    notFound();
  }
}
