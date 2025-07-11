"use client";
import { useTina } from "tinacms/dist/react";
import { EventQuery, Event as EventType } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { Container, Grid } from "@mui/material";

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
        <Grid container spacing={4}>
          {eventData.core_layout?.map((block, i) => (
            <Grid item xs={12} md={6} key={i}>
              <BlockRenderer
                blocks={[block]}
                eventData={eventData as EventType}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {eventData.additional_blocks && (
        <BlockRenderer
          blocks={eventData.additional_blocks}
          eventData={eventData as EventType}
        />
      )}
    </main>
  );
}
