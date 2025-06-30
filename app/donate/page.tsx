"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Favorite,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";

const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
  color: theme.palette.text.secondary,
  maxWidth: "70ch",
  marginLeft: "auto",
  marginRight: "auto",
}));

const MainRowSection = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  width: "100%",
  padding: 0,
  overflow: "hidden",
}));

const ColumnOne = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(5),
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  flexBasis: "33.33%",
  flexGrow: 1,
}));

const ColumnTwo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(5),
  flexBasis: "66.67%",
  flexGrow: 2,
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const ListHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "left",
}));

const ListsRowContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
  alignItems: "flex-start",
  justifyContent: "center",
  gap: theme.spacing(4),
  width: "100%",
  marginTop: theme.spacing(2),
}));

const ListWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    flex: 1,
  },
}));

export default function DonatePage() {
  // STUFF
  const acceptedItems = ["STUFF", "STUFF", "STUFF"];
  const notAcceptedItems = ["STUFF", "STUFF"];

  return (
    <PageContainer maxWidth="lg">
      <PageTitle variant="h1" component="h1">
        Donate to us
      </PageTitle>
      <PageSubtitle variant="h4" component="p">
        pls
      </PageSubtitle>

      <MainRowSection>
        <ColumnOne>
          <Box>
            <CardTitle variant="h3" component="h2">
              Zeffy
            </CardTitle>
            <Typography variant="body1" paragraph>
              Make a donation through Zeffy and directly help the cause.
            </Typography>
          </Box>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7129"
              startIcon={<Favorite />}
              size="large"
            >
              STUFF
            </Button>
          </Box>
        </ColumnOne>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />

        <Divider sx={{ display: { xs: "block", md: "none" } }} />

        <ColumnTwo>
          <ListsRowContainer>
            <ListWrapper>
              <ListHeader variant="h5" component="h3">
                We do accept:
              </ListHeader>
              <List dense>
                {acceptedItems.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <CheckCircleOutline color="success" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </ListWrapper>

            <ListWrapper>
              <ListHeader variant="h5" component="h3">
                We do NOT accept:
              </ListHeader>
              <List dense>
                {notAcceptedItems.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <HighlightOff color="error" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </ListWrapper>
          </ListsRowContainer>
        </ColumnTwo>
      </MainRowSection>
    </PageContainer>
  );
}
