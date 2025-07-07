"use client";

import { PageBlocks, Event } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TopBannerBlock } from "./TopBannerBlock";
import { EventSpotlightBlock } from "./EventSpotlightBlock";
import { QuickLinksBlock } from "./QuickLinksBlock";
import { MissionStatementBlock } from "./MissionStatementBlock";
import { TeamBoardBlock } from "./TeamBoardBlock";
import { DonationBlock } from "./DonationBlock";
import { VolunteerBlock } from "./VolunteerBlock";
import { FaqBlock } from "./FaqBlock";
import { RichTextContentBlock } from "./RichTextContentBlock";
import { Box } from "@mui/material";

import EventsListing from "../sections/EventsListing";
import InteractiveCalendar from "../sections/InteractiveCalendar";
import client from "@/tina/client";
import { useEffect, useState } from "react";

export const BlockRenderer = ({
  blocks,
}: {
  blocks: PageBlocks[] | null | undefined;
}) => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsResult = await client.queries.eventConnection();
      const events = eventsResult.data.eventConnection.edges.map(
        (edge) => edge.node as Event
      );
      setAllEvents(events);
    };
    fetchEvents();
  }, []);

  return (
    <>
      {blocks?.map((block, i) => {
        switch (block?.__typename) {
          case "PageBlocksEvents_listing":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <EventsListing data={block} allEvents={allEvents} />
              </div>
            );
          case "PageBlocksInteractive_calendar":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <InteractiveCalendar data={block} events={allEvents} />
              </div>
            );
          case "PageBlocksTop_banner":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <TopBannerBlock data={block} />
              </div>
            );
          case "PageBlocksEvent_spotlight":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <EventSpotlightBlock data={block} />
              </div>
            );
          case "PageBlocksQuick_links":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <QuickLinksBlock data={block} />
              </div>
            );
          case "PageBlocksMission_statement":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <MissionStatementBlock data={block} />
              </div>
            );
          case "PageBlocksTeam_board":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <TeamBoardBlock data={block} />
              </div>
            );
          case "PageBlocksDonation_section":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <DonationBlock data={block} />
              </div>
            );
          case "PageBlocksVolunteer_section":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <VolunteerBlock data={block} />
              </div>
            );
          case "PageBlocksFaq":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <FaqBlock data={block} />
              </div>
            );
          case "PageBlocksRich_text_content":
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <RichTextContentBlock data={block} />
              </div>
            );
          default:
            return (
              <Box bgcolor="red" color="white" p={4} my={2}>
                Component for {block?.__typename} not found.
              </Box>
            );
        }
      })}
    </>
  );
};
