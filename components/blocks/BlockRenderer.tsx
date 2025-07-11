"use client";
import {
  Event,
  PageBlocks,
  EventLayout,
  EventCore_layoutEvent_details,
  EventCore_layoutEvent_image,
  EventCore_layoutEvent_directions,
  EventCore_layoutEvent_map_embed,
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

        if (block.__typename.startsWith("EventCore_layout")) {
          switch (block.__typename) {
            case "EventCore_layoutEvent_details":
              return eventData ? (
                <EventDetailsBlock
                  key={i}
                  data={block as EventCore_layoutEvent_details}
                  eventData={eventData}
                />
              ) : null;
            case "EventCore_layoutEvent_image":
              return (
                <EventImageBlock
                  key={i}
                  data={block as EventCore_layoutEvent_image}
                />
              );
            case "EventCore_layoutEvent_directions":
              return eventData ? (
                <EventDirectionsBlock
                  key={i}
                  data={block as EventCore_layoutEvent_directions}
                  eventData={eventData}
                />
              ) : null;
            case "EventCore_layoutEvent_map_embed":
              return (
                <EventMapEmbedBlock
                  key={i}
                  data={block as EventCore_layoutEvent_map_embed}
                />
              );
            default:
              return null;
          }
        }

        const templateName = block.__typename.split("_").pop();

        switch (templateName) {
          case "Top_banner":
            return (
              <TopBannerBlock key={i} data={block as PageBlocksTop_banner} />
            );
          case "Section_header":
            return (
              <SectionHeaderBlock
                key={i}
                data={block as PageBlocksSection_header}
              />
            );
          case "Rich_text_content":
            return (
              <RichTextContentBlock
                key={i}
                data={block as PageBlocksRich_text_content}
              />
            );
          case "Two_column":
            return (
              <TwoColumnBlock key={i} data={block as PageBlocksTwo_column} />
            );
          case "Faq":
            return <FaqBlock key={i} data={block as PageBlocksFaq} />;
          case "Image_gallery":
            return (
              <ImageGalleryBlock
                key={i}
                data={block as PageBlocksImage_gallery}
              />
            );
          case "Button_group":
            return (
              <ButtonGroupBlock key={i} data={block as PageBlocksButtonGroup} />
            );
          case "Interactive_calendar":
            return (
              <InteractiveCalendar
                key={i}
                data={block as PageBlocksInteractive_calendar}
                events={allEvents as Event[]}
              />
            );
          case "Mission_statement":
            return (
              <MissionStatementBlock
                key={i}
                data={block as PageBlocksMission_statement}
              />
            );
          case "Quick_links":
            return (
              <QuickLinksBlock key={i} data={block as PageBlocksQuick_links} />
            );
          case "Event_spotlight":
            return (
              <EventSpotlightBlock
                key={i}
                data={block as PageBlocksEvent_spotlight}
                mostUpcomingEvent={mostUpcomingEvent}
              />
            );
          case "Team_board":
            return (
              <TeamBoardBlock key={i} data={block as PageBlocksTeam_board} />
            );
          case "Volunteer_section":
            return (
              <VolunteerBlock
                key={i}
                data={block as PageBlocksVolunteer_section}
              />
            );
          case "Zeffy_donation":
            return (
              <ZeffyDonationBlock
                key={i}
                data={block as PageBlocksZeffy_donation}
              />
            );
          case "Item_donation_list":
            return (
              <ItemDonationListBlock
                key={i}
                data={block as PageBlocksItem_donation_list}
              />
            );
          case "Events_listing":
            return (
              <EventsListing
                key={i}
                data={block as PageBlocksEvents_listing}
                allEvents={allEvents}
              />
            );
          default:
            console.warn(
              "HOW DID U CHOOSE THIS BLOCK IT DOESNT EVEN EXIST",
              block.__typename
            );
            return null;
        }
      })}
    </>
  );
};
