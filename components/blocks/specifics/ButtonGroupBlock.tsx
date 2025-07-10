"use client";
import {
  PageBlocksButtonGroup,
  PageBlocksButtonGroupButtons,
} from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
  margin: theme.spacing(4, 0),
  flexWrap: "wrap",
}));

export const ButtonGroupBlock = ({ data }: { data: PageBlocksButtonGroup }) => {
  if (!data.buttons || data.buttons.length === 0) {
    return null;
  }
  return (
    <Container maxWidth="lg" data-tina-field={tinaField(data)}>
      <ButtonContainer>
        {data.buttons.map(
          (button: PageBlocksButtonGroupButtons | null, i: number) =>
            button ? (
              <Button
                key={i}
                href={button.link || "#"}
                variant="contained"
                component={NextLink}
                data-tina-field={tinaField(button)}
              >
                {button.text}
              </Button>
            ) : null
        )}
      </ButtonContainer>
    </Container>
  );
};
