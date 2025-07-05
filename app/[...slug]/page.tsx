import client from "@/tina/client";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { notFound } from "next/navigation";

export default async function SlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug?.join("/") || "home";

  try {
    const res = await client.queries.page({
      relativePath: `${slug}.mdx`,
    });

    return (
      <main id="main-content">
        <BlockRenderer blocks={res.data.page.blocks} />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch page:", slug, error);
    notFound();
  }
}

export async function generateStaticParams() {
  const pagesListData = await client.queries.pageConnection();
  const paths = pagesListData.data.pageConnection.edges
    .map((edge) => {
      const slug = edge.node._sys.filename;
      if (slug === "home") {
        return { slug: [] };
      }
      return { slug: [slug] };
    })
    .filter((p) => p);

  return paths;
}
