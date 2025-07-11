"use client";
import { useTina } from "tinacms/dist/react";
import { EventQuery, Event as EventType } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { Container } from "@mui/material";

export default function EventPageClient(props: {
  data: EventQuery;
  variables: { relativePath: string };
  query: string;
}) {
  const { data } = useTina(props);
  const eventData = data.event;

  if (!eventData) {
    return null;
  }

  return (
    <main id="main-content">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {eventData.core_layout && (
          <BlockRenderer
            blocks={eventData.core_layout}
            eventData={eventData as EventType}
          />
        )}
        {eventData.additional_blocks && (
          <BlockRenderer
            blocks={eventData.additional_blocks}
            eventData={eventData as EventType}
          />
        )}
      </Container>
    </main>
  );
}
