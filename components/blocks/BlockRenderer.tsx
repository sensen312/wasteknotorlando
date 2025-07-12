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
  isCmsEnabled?: boolean;
}

export const BlockRenderer = ({
  blocks,
  eventData,
  allEvents,
  mostUpcomingEvent,
  cms,
  isCmsEnabled,
}: BlockRendererProps) => {
  return (
    <>
      {blocks?.map((block, i) => {
        if (!block) return null;

        const templateName = block.__typename
          ?.replace("PageBlocks", "")
          .replace(/_/g, "");

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
          case "topbanner":
            return (
              <TopBannerBlock key={i} data={block as PageBlocksTop_banner} />
            );
          case "sectionheader":
            return (
              <SectionHeaderBlock
                key={i}
                data={block as PageBlocksSection_header}
              />
            );
          case "richtextcontent":
            return (
              <RichTextContentBlock
                key={i}
                data={block as PageBlocksRich_text_content}
              />
            );
          case "twocolumn":
            return (
              <TwoColumnBlock key={i} data={block as PageBlocksTwo_column} />
            );
          case "faq":
            return <FaqBlock key={i} data={block as PageBlocksFaq} />;
          case "imagegallery":
            return (
              <ImageGalleryBlock
                key={i}
                data={block as PageBlocksImage_gallery}
              />
            );
          case "buttongroup":
            return (
              <ButtonGroupBlock key={i} data={block as PageBlocksButtonGroup} />
            );
          case "interactivecalendar":
            return allEvents ? (
              <InteractiveCalendar
                key={i}
                data={block as PageBlocksInteractive_calendar}
                events={allEvents}
              />
            ) : null;
          case "missionstatement":
            return (
              <MissionStatementBlock
                key={i}
                data={block as PageBlocksMission_statement}
              />
            );
          case "quicklinks":
            return (
              <QuickLinksBlock key={i} data={block as PageBlocksQuick_links} />
            );
          case "eventspotlight":
            return (
              <EventSpotlightBlock
                key={i}
                data={block as PageBlocksEvent_spotlight}
                mostUpcomingEvent={mostUpcomingEvent}
              />
            );
          case "teamboard":
            return (
              <TeamBoardBlock key={i} data={block as PageBlocksTeam_board} />
            );
          case "volunteersection":
            return (
              <VolunteerBlock
                key={i}
                data={block as PageBlocksVolunteer_section}
              />
            );
          case "zeffydonation":
            return (
              <ZeffyDonationBlock
                key={i}
                data={block as PageBlocksZeffy_donation}
              />
            );
          case "itemdonationlist":
            return (
              <ItemDonationListBlock
                key={i}
                data={block as PageBlocksItem_donation_list}
              />
            );
          case "eventslisting":
            const eventListingData = block as PageBlocksEvents_listing;
            const referencedEvents = eventListingData.events
              ?.map((e) => e?.event)
              .filter(Boolean) as Event[] | [];
            return (
              <EventsListing
                key={i}
                data={eventListingData}
                allEvents={referencedEvents}
                cms={cms}
                isCmsEnabled={isCmsEnabled}
              />
            );
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
