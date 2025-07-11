"use client";
import { useTina } from "tinacms/dist/react";
import { EventQuery, Event as EventType } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
          {eventData.core_layout?.map((block, i) => (
            <FlexGridItem key={i}>
              <BlockRenderer
                blocks={[block]}
                eventData={eventData as EventType}
              />
            </FlexGridItem>
          ))}
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
