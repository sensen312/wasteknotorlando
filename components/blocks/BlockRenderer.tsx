import { PageBlocks } from "@/tina/__generated__/types";
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
            return <TopBannerBlock key={i} data={block} />;
          case "PageBlocksEvent_spotlight":
            return <EventSpotlightBlock key={i} data={block} />;
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
