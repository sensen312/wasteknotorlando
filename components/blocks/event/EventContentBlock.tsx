"use client";
import { EventLayoutEvent_content } from "@/tina/__generated__/types";
import { BlockRenderer } from "../BlockRenderer";

export const EventContentBlock = ({
  data,
}: {
  data: EventLayoutEvent_content;
}) => {
  return <BlockRenderer blocks={data.contentBlocks} />;
};
