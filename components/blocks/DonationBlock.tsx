"use client";
import { PageBlocksDonation_section } from "@/tina/__generated__/types";
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
const PageTitleWrapper = styled(Box)({
  textAlign: "center",
  marginBottom: "40px",
});
const PageTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
  position: "relative",
  display: "inline-block",
  paddingBottom: theme.spacing(1.5),
  "&::after": {
    content: '""',
    position: "absolute",
    display: "block",
    width: "60%",
    height: "4px",
    backgroundColor: theme.palette.secondary.main,
    bottom: 0,
    left: "20%",
  },
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
  [theme.breakpoints.up("md")]: { flexDirection: "row" },
  width: "100%",
  padding: 0,
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`,
}));
const ColumnOne = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(5),
  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
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

export const DonationBlock = ({
  data,
}: {
  data: PageBlocksDonation_section;
}) => {
  return (
    <PageContainer maxWidth="lg">
      <PageTitleWrapper>
        <PageTitle variant="h1" component="h1">
          {data.title}
        </PageTitle>
      </PageTitleWrapper>
      <PageSubtitle variant="h4" component="p">
        {data.subtitle}
      </PageSubtitle>
      <MainRowSection elevation={0}>
        <ColumnOne>
          <Box>
            <CardTitle variant="h3" component="h2">
              {data.zeffyTitle}
            </CardTitle>
            <Typography variant="body1" paragraph>
              {data.zeffyText}
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              href={data.zeffyLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Favorite />}
              size="large"
            >
              DONATE
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
          <CardTitle
            variant="h3"
            component="h2"
            sx={{ textAlign: "center", mb: 4 }}
          >
            {data.itemsTitle}
          </CardTitle>
          <ListsRowContainer>
            <ListWrapper>
              <ListHeader variant="h5" component="h3">
                {data.acceptedHeader}
              </ListHeader>
              <List dense>
                {data.acceptedItems?.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon
                      sx={{ minWidth: "40px", color: "success.main" }}
                    >
                      <CheckCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </ListWrapper>
            <ListWrapper>
              <ListHeader variant="h5" component="h3">
                {data.notAcceptedHeader}
              </ListHeader>
              <List dense>
                {data.notAcceptedItems?.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon
                      sx={{ minWidth: "40px", color: "error.main" }}
                    >
                      <HighlightOff />
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
};
