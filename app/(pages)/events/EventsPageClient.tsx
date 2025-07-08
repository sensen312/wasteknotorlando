"use client";
import { useTina } from "tinacms/dist/react";
import {
  PageQuery,
  EventConnectionQuery,
  Event,
} from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export default function EventsPageClient(props: {
  pageData: {
    data: PageQuery;
    variables: { relativePath: string };
    query: string;
  };
  eventsData: {
    data: EventConnectionQuery;
    variables: {};
    query: string;
  };
}) {
  const { data: page } = useTina(props.pageData);
  const { data: eventsConnection } = useTina(props.eventsData);

  const allEvents =
    eventsConnection.eventConnection.edges?.map((edge) => edge.node) || [];

  return (
    <main id="main-content">
      <BlockRenderer
        blocks={page.page.blocks}
        allEvents={allEvents as Event[]}
      />
    </main>
  );
}
