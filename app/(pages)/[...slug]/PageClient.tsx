"use client";
import { useTina } from "tinacms/dist/react";
import { PageQuery, Event } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { useEffect } from "react";

export function PageClient(props: {
  data: PageQuery;
  variables: { relativePath: string };
  query: string;
  allEvents?: Event[];
  mostUpcomingEvent?: Event | null;
}) {
  const { data, cms } = useTina(props);

  useEffect(() => {
    console.log("Page component mounted.");
  }, []);

  return (
    <main id="main-content">
      <BlockRenderer
        blocks={data.page.blocks}
        allEvents={props.allEvents}
        mostUpcomingEvent={props.mostUpcomingEvent}
        cms={cms}
      />
    </main>
  );
}
