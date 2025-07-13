"use client";
import { tinaField } from "tinacms/dist/react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import NextLink from "next/link";
import {
  EventAdditional_blocksBack_button,
  PageBlocksBack_button,
} from "@/tina/__generated__/types";

const BackButtonWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

interface BackButtonBlockProps {
  data: PageBlocksBack_button | EventAdditional_blocksBack_button;
}

export const BackButtonBlock = ({ data }: BackButtonBlockProps) => {
  return (
    <BackButtonWrapper data-tina-field={tinaField(data)}>
      <StyledIconButton
        component={NextLink}
        href={data.link || "#"}
        aria-label="Go back to previous page"
        title="Go back to previous page"
      >
        <ArrowBack />
      </StyledIconButton>
    </BackButtonWrapper>
  );
};
