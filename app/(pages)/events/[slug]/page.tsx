import client from "@/tina/client";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import EventPageClient from "./EventPageClient";
import { Event } from "@/tina/__generated__/types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const eventResult = await client.queries.event({
      relativePath: `${params.slug}.mdx`,
    });
    const event = eventResult.data.event;
    const siteURL = "https://www.wasteknotorlando.org";
    const imageUrl = event.image?.src
      ? `${siteURL}${event.image.src}`
      : `${siteURL}/icon.png`;

    return {
      title: event.title,
      description: event.description,
      openGraph: {
        title: event.title,
        description: event.description,
        url: `${siteURL}/events/${params.slug}`,
        images: [
          {
            url: imageUrl,
            alt: event.image?.alt || event.title,
          },
        ],
        type: "article",
      },
    };
  } catch (e) {
    console.error(`Failed to generate event metadata ;-; "${params.slug}":`, e);
    return {};
  }
}

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
