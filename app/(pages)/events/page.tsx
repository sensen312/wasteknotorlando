import client from "@/tina/client";
import EventsListing from "@/components/sections/EventsListing";

export default async function EventsPage() {
  const eventsResult = await client.queries.eventConnection();
  const allEvents = eventsResult.data.eventConnection.edges.map(
    (edge) => edge.node
  );

  return (
    <main id="main-content">
      <EventsListing allEvents={allEvents} />
    </main>
  );
}
