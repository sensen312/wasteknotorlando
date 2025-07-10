import client from "@/tina/client";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export default async function IndividualEventPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const eventResult = await client.queries.event({
      relativePath: `${params.slug}.mdx`,
    });

    const eventData = eventResult.data.event;

    if (!eventData) {
      notFound();
    }

    return (
      <main id="main-content">
        <BlockRenderer blocks={eventData.layout} eventData={eventData} />
      </main>
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
