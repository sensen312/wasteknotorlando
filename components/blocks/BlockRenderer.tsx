"use client";
import { Event, PageBlocks, EventLayout } from "@/tina/__generated__/types";
import { ImageGalleryBlock } from "./content/ImageGalleryBlock";
import { RichTextContentBlock } from "./content/RichTextContentBlock";
import { SectionHeaderBlock } from "./content/SectionHeaderBlock";
import { TwoColumnBlock } from "./content/TwoColumnBlock";
import { ButtonGroupBlock } from "./specifics/ButtonGroupBlock";
import { EventSpotlightBlock } from "./specifics/EventSpotlightBlock";
import { FaqBlock } from "./sections/FaqBlock";
import { MissionStatementBlock } from "./sections/MissionStatementBlock";
import { QuickLinksBlock } from "./sections/QuickLinksBlock";
import { TeamBoardBlock } from "./sections/TeamBoardBlock";
import { VolunteerBlock } from "./sections/VolunteerBlock";
import { ZeffyDonationBlock } from "./sections/ZeffyDonationBlock";
import { ItemDonationListBlock } from "./sections/ItemDonationListBlock";
import EventsListing from "../sections/EventsListing";
import InteractiveCalendar from "../sections/InteractiveCalendar";
import { TopBannerBlock } from "./TopBannerBlock";
import { EventDetailsBlock } from "./event/EventDetailsBlock";
import { EventImageBlock } from "./event/EventImageBlock";
import { EventDirectionsBlock } from "./event/EventDirectionsBlock";
import { EventMapEmbedBlock } from "./event/EventMapEmbedBlock";
import { EventContentBlock } from "./event/EventContentBlock";

type AnyBlock = PageBlocks | EventLayout;

interface BlockRendererProps {
  blocks: AnyBlock[] | null | undefined;
  eventData?: Event;
  allEvents?: Event[];
  mostUpcomingEvent?: Event | null;
}

export const BlockRenderer = ({
  blocks,
  eventData,
  allEvents = [],
  mostUpcomingEvent,
}: BlockRendererProps) => {
  return (
    <>
      {blocks?.map((block, i) => {
        if (!block) return null;

        switch (block.__typename) {
          case "EventLayoutEvent_details":
            return eventData ? (
              <EventDetailsBlock key={i} data={eventData} />
            ) : null;
          case "EventLayoutEvent_image":
            return eventData ? (
              <EventImageBlock key={i} data={eventData} />
            ) : null;
          case "EventLayoutEvent_content":
            return <EventContentBlock key={i} data={block} />;
          case "EventLayoutEvent_directions":
            return eventData ? (
              <EventDirectionsBlock key={i} data={eventData} />
            ) : null;
          case "EventLayoutEvent_map_embed":
            return eventData ? (
              <EventMapEmbedBlock key={i} data={eventData} />
            ) : null;
          case "PageBlocksButtonGroup":
            return <ButtonGroupBlock key={i} data={block} />;
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
              <InteractiveCalendar
                key={i}
                data={block}
                events={allEvents as Event[]}
              />
            );
          case "PageBlocksImage_gallery":
            return <ImageGalleryBlock key={i} data={block} />;
          case "PageBlocksTwo_column":
            return <TwoColumnBlock key={i} data={block} />;
          case "PageBlocksSection_header":
            return <SectionHeaderBlock key={i} data={block} />;
          case "PageBlocksZeffy_donation":
            return <ZeffyDonationBlock key={i} data={block} />;
          case "PageBlocksItem_donation_list":
            return <ItemDonationListBlock key={i} data={block} />;

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
