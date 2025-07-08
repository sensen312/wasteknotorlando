"use client";
import { useTina } from "tinacms/dist/react";
import { PageQuery, Event } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export default function EventsPageClient(props: {
  pageData: {
    data: PageQuery;
    variables: { relativePath: string };
    query: string;
  };
  allEvents: Event[];
}) {
  const { data: page } = useTina(props.pageData);

  return (
    <main id="main-content">
      <BlockRenderer blocks={page.page.blocks} allEvents={props.allEvents} />
    </main>
  );
}
