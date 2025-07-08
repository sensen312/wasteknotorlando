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
    const allNodes =
      eventsResult.data.eventConnection.edges?.map((edge) => edge?.node) || [];

    const validEvents = allNodes.filter(
      (event): event is Event & { date: string } =>
        !!event && typeof event.date === "string"
    );

    console.log(`\n--- Found ${validEvents.length} events yipppieee ---`);
    validEvents.forEach((event) => {
      console.log(`- Title: ${event.title}, Date: ${event.date}`);
    });
    console.log("--------------------------------------------------\n");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventsWithDates = validEvents.map((event) => ({
      ...event,
      dateObj: new Date(event.date),
    }));

    const futureEvents = eventsWithDates.filter(
      (event) => event.dateObj >= today
    );

    console.log(`\n--- Found ${futureEvents.length} events comparison ;-;---`);
    futureEvents.forEach((event) => {
      console.log(
        `- Title: ${
          event.title
        }, Date Object to String: ${event.dateObj.toISOString()}`
      );
    });

    const sortedFutureEvents = [...futureEvents].sort(
      (a, b) => a.dateObj.getTime() - b.dateObj.getTime()
    );

    console.log(`\n--- Sorted List closest first ---`);
    sortedFutureEvents.forEach((event) => {
      console.log(
        `- Title: ${
          event.title
        }, Date Object to String: ${event.dateObj.toISOString()}`
      );
    });
    console.log("--------------------------------------------------\n");

    const mostUpcomingEvent = sortedFutureEvents[0];

    if (mostUpcomingEvent) {
      console.log(
        `FINAL RESULT - MOST RECENT EVENT: ${mostUpcomingEvent.title}`
      );
    } else {
      console.log("FINAL RESULT - No upcoming event found, using fallback.");
    }

    return (
      <PageClient
        data={res.data}
        variables={res.variables}
        query={res.query}
        allEvents={validEvents as Event[]}
        mostUpcomingEvent={mostUpcomingEvent || null}
      />
    );
  } catch (error) {
    console.error("Failed to fetch homepage during build:", error);
    notFound();
  }
}
