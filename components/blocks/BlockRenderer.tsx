"use client";
import {
  Event,
  PageBlocks,
  PageBlocksTop_banner,
  PageBlocksSection_header,
  PageBlocksRich_text_content,
  PageBlocksTwo_column,
  PageBlocksFaq,
  PageBlocksImage_gallery,
  PageBlocksButtonGroup,
  PageBlocksInteractive_calendar,
  PageBlocksMission_statement,
  PageBlocksQuick_links,
  PageBlocksEvent_spotlight,
  PageBlocksTeam_board,
  PageBlocksVolunteer_section,
  PageBlocksZeffy_donation,
  PageBlocksItem_donation_list,
  PageBlocksEvents_listing,
} from "@/tina/__generated__/types";
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
import type { TinaCMS } from "tinacms";

type AnyBlock = PageBlocks;

interface BlockRendererProps {
  blocks: AnyBlock[] | null | undefined;
  eventData?: Event;
  allEvents?: Event[];
  mostUpcomingEvent?: Event | null;
  cms?: TinaCMS;
}

export const BlockRenderer = ({
  blocks,
  eventData,
  allEvents,
  mostUpcomingEvent,
  cms,
}: BlockRendererProps) => {
  return (
    <>
      {blocks?.map((block, i) => {
        if (!block) return null;

        const templateName = block.__typename?.split("_").pop();

        switch (templateName) {
          case "details":
            return eventData ? (
              <EventDetailsBlock key={i} eventData={eventData} />
            ) : null;
          case "image":
            return eventData ? (
              <EventImageBlock key={i} eventData={eventData} />
            ) : null;
          case "directions":
            return eventData ? (
              <EventDirectionsBlock key={i} eventData={eventData} />
            ) : null;
          case "embed":
            return eventData ? (
              <EventMapEmbedBlock key={i} eventData={eventData} />
            ) : null;
          case "banner":
            return (
              <TopBannerBlock key={i} data={block as PageBlocksTop_banner} />
            );
          case "header":
            return (
              <SectionHeaderBlock
                key={i}
                data={block as PageBlocksSection_header}
              />
            );
          case "content":
            return (
              <RichTextContentBlock
                key={i}
                data={block as PageBlocksRich_text_content}
              />
            );
          case "column":
            return (
              <TwoColumnBlock key={i} data={block as PageBlocksTwo_column} />
            );
          case "Faq":
            return <FaqBlock key={i} data={block as PageBlocksFaq} />;
          case "gallery":
            return (
              <ImageGalleryBlock
                key={i}
                data={block as PageBlocksImage_gallery}
              />
            );
          case "group":
            return (
              <ButtonGroupBlock key={i} data={block as PageBlocksButtonGroup} />
            );
          case "calendar":
            return allEvents ? (
              <InteractiveCalendar
                key={i}
                data={block as PageBlocksInteractive_calendar}
                events={allEvents}
              />
            ) : null;
          case "statement":
            return (
              <MissionStatementBlock
                key={i}
                data={block as PageBlocksMission_statement}
              />
            );
          case "links":
            return (
              <QuickLinksBlock key={i} data={block as PageBlocksQuick_links} />
            );
          case "spotlight":
            return (
              <EventSpotlightBlock
                key={i}
                data={block as PageBlocksEvent_spotlight}
                mostUpcomingEvent={mostUpcomingEvent}
              />
            );
          case "board":
            return (
              <TeamBoardBlock key={i} data={block as PageBlocksTeam_board} />
            );
          case "section":
            return (
              <VolunteerBlock
                key={i}
                data={block as PageBlocksVolunteer_section}
              />
            );
          case "donation":
            return (
              <ZeffyDonationBlock
                key={i}
                data={block as PageBlocksZeffy_donation}
              />
            );
          case "list":
            return (
              <ItemDonationListBlock
                key={i}
                data={block as PageBlocksItem_donation_list}
              />
            );
          case "listing":
            return allEvents ? (
              <EventsListing
                key={i}
                data={block as PageBlocksEvents_listing}
                allEvents={allEvents}
                cms={cms}
              />
            ) : null;
          default:
            console.warn(
              `HOW DID U CHOOSE THIS BLOCK IT DOESNT EVEN EXIST: ${block.__typename}, TEMPLATE: ${templateName}`
            );
            return null;
        }
      })}
    </>
  );
};
