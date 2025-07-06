import { PageBlocks } from "@/tina/__generated__/types";
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

export const BlockRenderer = ({
  blocks,
}: {
  blocks: PageBlocks[] | null | undefined;
}) => {
  return (
    <>
      {blocks?.map((block, i) => {
        switch (block?.__typename) {
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
