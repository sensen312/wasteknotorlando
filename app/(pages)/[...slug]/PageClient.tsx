"use client";

import { useTina } from "tinacms/dist/react";
import { PageQuery } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export function PageClient(props: {
  data: PageQuery;
  variables: { relativePath: string };
  query: string;
}) {
  const { data } = useTina(props);

  return (
    <main id="main-content">
      <BlockRenderer blocks={data.page.blocks} />
    </main>
  );
}
