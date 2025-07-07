import client from "@/tina/client";
import EventDisplay from "./EventDisplay";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

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
        <EventDisplay {...eventResult} />
      </main>
    );
  } catch {
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
