"use client";
import { PageBlocksTwo_Column } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

export const TwoColumnBlock = ({ data }: { data: PageBlocksTwo_Column }) => {
  return (
    <Container maxWidth="lg" data-tina-field={tinaField(data)}>
      <StyledGridContainer container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box data-tina-field={tinaField(data, "left")}>
            <TinaMarkdown content={data.left} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box data-tina-field={tinaField(data, "right")}>
            <TinaMarkdown content={data.right} />
          </Box>
        </Grid>
      </StyledGridContainer>
    </Container>
  );
};
