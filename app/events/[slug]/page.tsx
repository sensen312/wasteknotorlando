import client from "@/tina/client";
import EventDisplay from "./EventDisplay";
import { notFound } from "next/navigation";

export default async function IndividualEventPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const eventResult = await client.queries.event({
      relativePath: `${params.slug}.mdx`,
    });
    return (
      <main id="main-content">
        <EventDisplay eventData={eventResult.data.event} />
      </main>
    );
  } catch (e) {
    notFound();
  }
}

export async function generateStaticParams() {
  const eventsListData = await client.queries.eventConnection();
  return eventsListData.data.eventConnection.edges.map((event) => ({
    slug: event.node._sys.filename,
  }));
}
