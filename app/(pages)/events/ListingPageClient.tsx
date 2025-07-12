"use client";
import { useTina } from "tinacms/dist/react";
import { PageQuery, Event } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { Container } from "@mui/material";
import { useEffect } from "react";

export default function ListingPageClient(props: {
  data: PageQuery;
  variables: { relativePath: string };
  query: string;
  allEvents: Event[];
}) {
  const { data, cms } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const isCmsEnabled = !!cms?.enabled;

  useEffect(() => {
    console.log("CMS ENABLED YAY:", isCmsEnabled);
  }, [isCmsEnabled]);

  if (!data || !data.page) {
    return null;
  }

  return (
    <main id="main-content">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <BlockRenderer
          blocks={data.page.blocks}
          allEvents={props.allEvents}
          cms={cms}
          isCmsEnabled={isCmsEnabled}
        />
      </Container>
    </main>
  );
}
