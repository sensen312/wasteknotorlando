import client from "@/tina/client";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { notFound } from "next/navigation";

export default async function HomePage() {
  try {
    const res = await client.queries.page({
      relativePath: "home.mdx",
    });

    return (
      <main id="main-content">
        <BlockRenderer blocks={res.data.page.blocks} />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch homepage. ;-;", error);
    notFound();
  }
}
