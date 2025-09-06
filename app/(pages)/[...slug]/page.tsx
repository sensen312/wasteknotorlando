import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "./PageClient";
import { Event, PageBlocksMission_Statement } from "@/tina/__generated__/types";
import fs from "fs";
import path from "path";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params.slug?.join("/") || "";
  try {
    const pageResult = await client.queries.page({
      relativePath: `${slug}.mdx`,
    });
    const page = pageResult.data.page;
    const siteURL = "https://www.wasteknotorlando.org";
    const missionBlock = page.blocks?.find(
      (b) => b?.__typename === "PageBlocksMission_statement"
    ) as PageBlocksMission_Statement | undefined;

    const pageTitle = page.title || "WasteKnot Orlando";
    const pageDescription =
      missionBlock?.statement ||
      "Our mission is to provide a welcoming space where the Orlando community can divert post consumer goods from the trash through reuse.";

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `${siteURL}/${slug}`,
      },
    };
  } catch (error) {
    console.error(`Failed to generate the metadata ;-;  "${slug}":`, error);
    return {};
  }
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug?.join("/") || "";

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
