"use client";
import {
  Event,
  PageBlocks,
  PageBlocksEvents_Listing,
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
import { CanvaEmbedBlock } from "./content/CanvaEmbedBlock";
import type { TinaCMS } from "tinacms";

interface BlockRendererProps {
  blocks: PageBlocks[] | null | undefined;
  allEvents?: Event[];
  mostUpcomingEvent?: Event | null;
  cms?: TinaCMS;
  isCmsEnabled?: boolean;
}

export const BlockRenderer = ({
  blocks,
  allEvents,
  mostUpcomingEvent,
  cms,
  isCmsEnabled,
}: BlockRendererProps) => {
  return (
    <>
      {blocks?.map((block, i) => {
        if (!block || !block.__typename) {
          return null;
        }

        const typeNameToLog = block.__typename;

        switch (block.__typename) {
          case "PageBlocksTop_banner":
            return <TopBannerBlock key={i} data={block} />;
          case "PageBlocksSection_header":
            return <SectionHeaderBlock key={i} data={block} />;
          case "PageBlocksRich_text_content":
            return <RichTextContentBlock key={i} data={block} />;
          case "PageBlocksTwo_column":
            return <TwoColumnBlock key={i} data={block} />;
          case "PageBlocksFaq":
            return <FaqBlock key={i} data={block} />;
          case "PageBlocksImage_gallery":
            return <ImageGalleryBlock key={i} data={block} />;
          case "PageBlocksButton_group":
            return <ButtonGroupBlock key={i} data={block} />;
          case "PageBlocksMission_statement":
            return <MissionStatementBlock key={i} data={block} />;
          case "PageBlocksQuick_links":
            return <QuickLinksBlock key={i} data={block} />;
          case "PageBlocksTeam_board":
            return <TeamBoardBlock key={i} data={block} />;
          case "PageBlocksVolunteer_section":
            return <VolunteerBlock key={i} data={block} />;
          case "PageBlocksZeffy_donation":
            return <ZeffyDonationBlock key={i} data={block} />;
          case "PageBlocksItem_donation_list":
            return <ItemDonationListBlock key={i} data={block} />;
          case "PageBlocksCanva_canvaembed":
            return <CanvaEmbedBlock key={i} data={block} />;

          case "PageBlocksInteractive_calendar":
            return (
              <InteractiveCalendar
                key={i}
                data={block}
                events={allEvents || []}
              />
            );

          case "PageBlocksEvent_spotlight":
            return (
              <EventSpotlightBlock
                key={i}
                data={block}
                mostUpcomingEvent={mostUpcomingEvent}
              />
            );

          case "PageBlocksEvents_listing":
            const eventListingBlock = block as PageBlocksEvents_Listing;
            const referencedEvents =
              eventListingBlock.events
                ?.map((e) => e?.event)
                .filter((e): e is Event => !!e) || [];
            return (
              <EventsListing
                key={i}
                data={eventListingBlock}
                allEvents={referencedEvents}
                cms={cms}
                isCmsEnabled={isCmsEnabled}
              />
            );

          default:
            const templateName = typeNameToLog?.split("_").pop();
            console.warn(
              `HOW DID U CHOOSE THIS BLOCK IT DOESNT EVEN EXIST: ${typeNameToLog}, TEMPLATE: ${templateName}`
            );
            return null;
        }
      })}
    </>
  );
};
