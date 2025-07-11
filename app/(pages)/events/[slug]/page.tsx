import client from "@/tina/client";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import EventPageClient from "./EventPageClient";

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
      <EventPageClient
        data={eventResult.data}
        variables={eventResult.variables}
        query={eventResult.query}
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
