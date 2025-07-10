"use client";
import { Event, EventLayout } from "@/tina/__generated__/types";
import { EventDetailsBlock } from "./event/EventDetailsBlock";
import { EventImageBlock } from "./event/EventImageBlock";
import { EventDirectionsBlock } from "./event/EventDirectionsBlock";
import { EventMapEmbedBlock } from "./event/EventMapEmbedBlock";
import { EventContentBlock } from "./event/EventContentBlock";

export const EventLayoutRenderer = ({
  block,
  eventData,
}: {
  block: EventLayout;
  eventData: Event;
}) => {
  switch (block.__typename) {
    case "EventLayoutEvent_details":
      return <EventDetailsBlock data={eventData} />;
    case "EventLayoutEvent_image":
      return <EventImageBlock data={eventData} />;
    case "EventLayoutEvent_directions":
      return <EventDirectionsBlock data={eventData} />;
    case "EventLayoutEvent_map_embed":
      return <EventMapEmbedBlock data={eventData} />;
    case "EventLayoutEvent_content":
      return <EventContentBlock data={block} />;
    default:
      return null;
  }
};
