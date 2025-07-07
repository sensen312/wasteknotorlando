"use client";
import React from "react";
import { Page, Event } from "@/tina/__generated__/types";
import { TopBannerBlock } from "./TopBannerBlock";
import { EventSpotlightBlock } from "./EventSpotlightBlock";
import { QuickLinksBlock } from "./QuickLinksBlock";
import { MissionStatementBlock } from "./MissionStatementBlock";
import { TeamBoardBlock } from "./TeamBoardBlock";
import { DonationBlock } from "./DonationBlock";
import { VolunteerBlock } from "./VolunteerBlock";
import { FaqBlock } from "./FaqBlock";
import { RichTextContentBlock } from "./RichTextContentBlock";
import EventsListing from "../sections/EventsListing";
import InteractiveCalendar from "../sections/InteractiveCalendar";

export const BlockRenderer = ({
  blocks,
  allEvents = [],
  mostUpcomingEvent,
}: {
  blocks: Page["blocks"];
  allEvents?: Event[];
  mostUpcomingEvent?: Event | null;
}) => {
  return (
    <>
      {blocks?.map((block, i) => {
        if (!block) return null;
        switch (block.__typename) {
          case "PageBlocksTop_banner":
            return <TopBannerBlock key={i} data={block} />;
          case "PageBlocksEvent_spotlight":
            return (
              <EventSpotlightBlock
                key={i}
                data={block}
                mostUpcomingEvent={mostUpcomingEvent}
              />
            );
          case "PageBlocksQuick_links":
            return <QuickLinksBlock key={i} data={block} />;
          case "PageBlocksMission_statement":
            return <MissionStatementBlock key={i} data={block} />;
          case "PageBlocksTeam_board":
            return <TeamBoardBlock key={i} data={block} />;
          case "PageBlocksDonation_section":
            return <DonationBlock key={i} data={block} />;
          case "PageBlocksVolunteer_section":
            return <VolunteerBlock key={i} data={block} />;
          case "PageBlocksFaq":
            return <FaqBlock key={i} data={block} />;
          case "PageBlocksRich_text_content":
            return <RichTextContentBlock key={i} data={block} />;
          case "PageBlocksEvents_listing":
            return <EventsListing key={i} data={block} allEvents={allEvents} />;
          case "PageBlocksInteractive_calendar":
            return (
              <InteractiveCalendar key={i} data={block} events={allEvents} />
            );
          default:
            const unknownBlockType =
              block && typeof block === "object" && "__typename" in block
                ? (block as { __typename: string }).__typename
                : "Unknown Block";
            console.warn(
              "HOW DID U CHOOSE THIS BLOCK IT DOESNT EVEN EXIST",
              unknownBlockType
            );
            return null;
        }
      })}
    </>
  );
};
