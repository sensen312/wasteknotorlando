import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "./[...slug]/PageClient";
import {
  Event,
  Page,
  PageBlocksEvents_listing,
} from "@/tina/__generated__/types";

export default async function HomePage() {
  try {
    const homePageResult = await client.queries.page({
      relativePath: "home.mdx",
    });

    const eventsPageResult = await client.queries.page({
      relativePath: "events.mdx",
    });

    const eventsListingBlock = eventsPageResult.data.page.blocks?.find(
      (block: Page["blocks"][number]): block is PageBlocksEvents_listing =>
        block?.__typename === "PageBlocksEvents_listing"
    );

    const curatedEvents =
      eventsListingBlock?.events
        ?.map(
          (item: NonNullable<PageBlocksEvents_listing["events"]>[number]) =>
            item?.event
        )
        .filter((event): event is Event => !!event) || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mostUpcomingEvent = curatedEvents
      .filter((event: Event): event is Event & { date: string } => !!event.date)
      .map((event: Event & { date: string }) => ({
        ...event,
        dateObj: new Date(event.date),
      }))
      .filter((event: Event & { dateObj: Date }) => event.dateObj >= today)
      .sort(
        (a: { dateObj: Date }, b: { dateObj: Date }) =>
          a.dateObj.getTime() - b.dateObj.getTime()
      )[0];

    if (mostUpcomingEvent) {
      console.log(
        `FOUND MOST RECENT EVENT FROM LIST: ${mostUpcomingEvent.title}`
      );
    }

    return (
      <PageClient
        data={homePageResult.data}
        variables={homePageResult.variables}
        query={homePageResult.query}
        allEvents={curatedEvents}
        mostUpcomingEvent={mostUpcomingEvent || null}
      />
    );
  } catch (error) {
    console.error("Failed to fetch homepage at build ;-;", error);
    notFound();
  }
}
