import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "./PageClient";
import { Event } from "@/tina/__generated__/types";
import fs from "fs";
import path from "path";

export default async function SlugPage(props: { params: { slug: string[] } }) {
  const slug = props.params.slug?.join("/") || "";

  if (!slug) {
    return notFound();
  }

  try {
    const res = await client.queries.page({
      relativePath: `${slug}.mdx`,
    });

    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges
        ?.map((edge) => edge?.node)
        .filter((event): event is Event => !!event) || [];

    return <PageClient {...res} allEvents={allEvents} />;
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), "content/pages");
  const filenames = fs.readdirSync(pagesDir);

  const paths = filenames
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      if (slug === "home" || slug === "events") {
        return null;
      }
      return { slug: slug.split("/") };
    })
    .filter((p): p is { slug: string[] } => p !== null);

  return paths;
}
