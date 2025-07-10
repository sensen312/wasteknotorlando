"use client";
import { PageBlocksZeffy_Donation } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Favorite } from "@mui/icons-material";

const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const CardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  textAlign: "center",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  fontWeight: 700,
}));

const ActionBox = styled(Box)({
  marginTop: "32px",
});

export const ZeffyDonationBlock = ({
  data,
}: {
  data: PageBlocksZeffy_Donation;
}) => {
  return (
    <PageContainer maxWidth="md" data-tina-field={tinaField(data)}>
      <CardPaper elevation={0}>
        <Box>
          <CardTitle
            variant="h3"
            component="h2"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </CardTitle>
          <Typography
            variant="body1"
            paragraph
            data-tina-field={tinaField(data, "text")}
          >
            {data.text}
          </Typography>
        </Box>
        <ActionBox>
          <Button
            variant="contained"
            color="primary"
            href={data.zeffyLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<Favorite />}
            size="large"
            data-tina-field={tinaField(data, "zeffyLink")}
          >
            {data.buttonText}
          </Button>
        </ActionBox>
      </CardPaper>
    </PageContainer>
  );
};
