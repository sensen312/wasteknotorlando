import client from "@/tina/client";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import EventPageClient from "./EventPageClient";
import { Event } from "@/tina/__generated__/types";

export default async function IndividualEventPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const eventResult = await client.queries.event({
      relativePath: `${params.slug}.mdx`,
    });

    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges
        ?.map((edge) => edge?.node)
        .filter((event): event is Event => !!event) || [];

    return (
      <EventPageClient
        data={eventResult.data}
        variables={eventResult.variables}
        query={eventResult.query}
        allEvents={allEvents}
      />
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export async function generateStaticParams() {
  const eventsDir = path.join(process.cwd(), "content/events");
  const filenames = fs.readdirSync(eventsDir);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}
