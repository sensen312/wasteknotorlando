"use client";
import { useTina } from "tinacms/dist/react";
import { PageQuery, Event } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export function PageClient(props: {
  data: PageQuery;
  variables: { relativePath: string };
  query: string;
  allEvents?: Event[];
  mostUpcomingEvent?: Event | null;
}) {
  const { data } = useTina(props);

  return (
    <main id="main-content">
      <BlockRenderer
        blocks={data.page.blocks}
        allEvents={props.allEvents}
        mostUpcomingEvent={props.mostUpcomingEvent}
      />
    </main>
  );
}
