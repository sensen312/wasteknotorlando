"use client";
import { PageBlocksItem_donation_list } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";

const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const MainSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`,
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  textAlign: "center",
  fontWeight: 700,
}));

const ListHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "left",
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

const ListsRowContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: { flexDirection: "row" },
  alignItems: "flex-start",
  justifyContent: "center",
  gap: theme.spacing(4),
  width: "100%",
}));

const ListWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: { flex: 1 },
}));

const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "isSuccess",
})<{ isSuccess?: boolean }>(({ theme, isSuccess }) => ({
  minWidth: "40px",
  color: isSuccess ? theme.palette.success.main : theme.palette.error.main,
}));

export const ItemDonationListBlock = ({
  data,
}: {
  data: PageBlocksItem_donation_list;
}) => {
  return (
    <PageContainer maxWidth="lg" data-tina-field={tinaField(data)}>
      <MainSection elevation={0}>
        <CardTitle
          variant="h3"
          component="h2"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </CardTitle>
        <ListsRowContainer>
          <ListWrapper>
            <ListHeader
              variant="h5"
              component="h3"
              data-tina-field={tinaField(data, "acceptedHeader")}
            >
              {data.acceptedHeader}
            </ListHeader>
            <List dense data-tina-field={tinaField(data, "acceptedItems")}>
              {data.acceptedItems?.map((item: string | null, index: number) =>
                item ? (
                  <ListItem key={index} disableGutters>
                    <StyledListItemIcon isSuccess>
                      <CheckCircleOutline />
                    </StyledListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ) : null
              )}
            </List>
          </ListWrapper>
          <ListWrapper>
            <ListHeader
              variant="h5"
              component="h3"
              data-tina-field={tinaField(data, "notAcceptedHeader")}
            >
              {data.notAcceptedHeader}
            </ListHeader>
            <List dense data-tina-field={tinaField(data, "notAcceptedItems")}>
              {data.notAcceptedItems?.map(
                (item: string | null, index: number) =>
                  item ? (
                    <ListItem key={index} disableGutters>
                      <StyledListItemIcon>
                        <HighlightOff />
                      </StyledListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ) : null
              )}
            </List>
          </ListWrapper>
        </ListsRowContainer>
      </MainSection>
    </PageContainer>
  );
};
