"use client";
import { useTina } from "tinacms/dist/react";
import { EventQuery, Event as EventType } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { EventDetailsBlock } from "@/components/blocks/event/EventDetailsBlock";
import { EventImageBlock } from "@/components/blocks/event/EventImageBlock";
import { EventDirectionsBlock } from "@/components/blocks/event/EventDirectionsBlock";
import { EventMapEmbedBlock } from "@/components/blocks/event/EventMapEmbedBlock";

const FlexGridContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  margin: theme.spacing(-2),
}));

const FlexGridItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
  flexBasis: "100%",
  [theme.breakpoints.up("md")]: {
    flexBasis: "50%",
  },
  display: "flex",
  flexDirection: "column",
}));

const blockMap = {
  Details: (props: { eventData: EventType }) => (
    <EventDetailsBlock {...props} />
  ),
  Image: (props: { eventData: EventType }) => <EventImageBlock {...props} />,
  Directions: (props: { eventData: EventType }) => (
    <EventDirectionsBlock {...props} />
  ),
  "Map Embed": (props: { eventData: EventType }) => (
    <EventMapEmbedBlock {...props} />
  ),
};

export default function EventPageClient(props: {
  data: EventQuery;
  variables: { relativePath: string };
  query: string;
  allEvents?: EventType[];
}) {
  const { data } = useTina(props);
  const eventData = data.event;

  if (!eventData) {
    return null;
  }

  return (
    <main id="main-content">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <FlexGridContainer>
          {eventData.layout_blocks?.map((block, i) => {
            if (!block?.label) return null;
            const Component = blockMap[block.label as keyof typeof blockMap];
            return Component ? (
              <FlexGridItem key={i}>
                <Component eventData={eventData as EventType} />
              </FlexGridItem>
            ) : null;
          })}
        </FlexGridContainer>
      </Container>

      {eventData.additional_blocks && (
        <BlockRenderer
          blocks={eventData.additional_blocks}
          eventData={eventData as EventType}
          allEvents={props.allEvents}
        />
      )}
    </main>
  );
}
