"use client";
import { useMemo, useState } from "react";
import NextLink from "next/link";
import { Event, PageBlocksEvents_listing } from "@/tina/__generated__/types";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Stack,
  CardActionArea,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LocationOn,
  CalendarToday,
  Instagram,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaCMS } from "tinacms";

type UpcomingEvent = Event & {
  dateObj: Date;
};

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
  marginBottom: theme.spacing(5),
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

const EventListContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

const StyledEventCard = styled(Card)(({ theme }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: { flexDirection: "row" },
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  overflow: "visible",
  "&:hover": { transform: "translateY(-4px)", boxShadow: theme.shadows[6] },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  width: "100%",
  alignItems: "stretch",
  "&:hover .MuiCardActionArea-focusHighlight": {
    opacity: 0.1,
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.action.hover,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    width: "40%",
    maxWidth: "350px",
    flexShrink: 0,
  },
}));

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const EventInfoContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const EventTypeChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
  fontWeight: "bold",
}));

const InfoLine = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const DescriptionPreview = styled(Box)({
  marginTop: "16px",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& blockquote": {
    margin: 0,
    padding: 0,
    border: "none",
  },
});

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(0, 3, 3, 3),
  alignSelf: "flex-start",
}));

const NoEventsTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(5, 0),
}));

const StyledCalendarToday = styled(CalendarToday)({
  fontSize: "1.2rem",
});

const StyledLocationOn = styled(LocationOn)({
  fontSize: "1.2rem",
});

const AdminActions = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 10,
  display: "flex",
  gap: theme.spacing(0.5),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  boxShadow: theme.shadows[3],
}));

export default function EventsListing({
  data,
  allEvents = [],
  cms,
  isCmsEnabled,
}: {
  data: PageBlocksEvents_listing;
  allEvents: Event[];
  cms?: TinaCMS;
  isCmsEnabled?: boolean;
}) {
  const [deleteTarget, setDeleteTarget] = useState<{
    relativePath: string;
    title: string;
  } | null>(null);

  const handleInstaClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleAddEvent = () => {
    window.location.href = "/admin/index.html#/collections/event";
  };

  const handleEditEvent = (
    e: React.MouseEvent,
    relativePathWithExt: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const relativePath = relativePathWithExt.replace(/\.mdx?$/, "");
    window.location.href = `/admin/index.html#/collections/event/${relativePath}`;
  };

  const handleDeleteConfirmation = (event: Event) => {
    const relativePath = event._sys.path.replace("content/events/", "");
    setDeleteTarget({
      relativePath: relativePath,
      title: event.title,
    });
  };

  const handleDelete = async () => {
    if (!deleteTarget || !cms) return;
    try {
      await cms.api.tina.deleteDocument({
        collection: "event",
        relativePath: deleteTarget.relativePath,
      });
      cms.alerts.success(`YIPPIE EVENT IS GONE: ${deleteTarget.title}`);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Could not delete event ;-; because:", error);
      cms.alerts.error("Could not delete event ;-;");
    }
  };

  const upcomingEvents = useMemo(() => {
    if (!allEvents) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allEvents
      .filter((event): event is Event => !!event && !!event.date)
      .map(
        (event: Event): UpcomingEvent => ({
          ...event,
          dateObj: new Date(event.date),
        })
      )
      .filter((event: UpcomingEvent) => event.dateObj >= today)
      .sort(
        (a: UpcomingEvent, b: UpcomingEvent) =>
          a.dateObj.getTime() - b.dateObj.getTime()
      );
  }, [allEvents]);

  return (
    <PageContainer maxWidth="lg" data-tina-field={tinaField(data)}>
      <PageTitleWrapper>
        <PageTitle
          variant="h1"
          component="h1"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </PageTitle>
      </PageTitleWrapper>
      {isCmsEnabled && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddEvent}
          >
            Add New Event
          </Button>
        </Box>
      )}
      <EventListContainer>
        <Stack spacing={5}>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) =>
              event?._sys?.filename ? (
                <StyledEventCard
                  key={event.id}
                  data-tina-field={tinaField(event)}
                >
                  {isCmsEnabled && (
                    <AdminActions>
                      <IconButton
                        size="small"
                        onClick={(e) => handleEditEvent(e, event._sys.filename)}
                        aria-label={`Edit ${event.title}`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConfirmation(event);
                        }}
                        aria-label={`Delete ${event.title}`}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </AdminActions>
                  )}
                  <StyledCardActionArea
                    component={NextLink}
                    href={`/events/${event._sys.filename}`}
                    aria-label={`View details for ${event.title}`}
                  >
                    <ImageWrapper>
                      <StyledCardMedia
                        component="img"
                        image={event.image?.src || undefined}
                        alt={event.image?.alt || ""}
                        data-tina-field={tinaField(event, "image")}
                      />
                    </ImageWrapper>
                    <EventInfoContainer>
                      <StyledCardContent>
                        {event.type && (
                          <EventTypeChip
                            label={event.type}
                            data-tina-field={tinaField(event, "type")}
                          />
                        )}
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="h2"
                          data-tina-field={tinaField(event, "title")}
                        >
                          {event.title}
                        </Typography>
                        <InfoLine data-tina-field={tinaField(event, "date")}>
                          <InfoIcon>
                            <StyledCalendarToday />
                          </InfoIcon>
                          <Typography variant="body1">
                            {event.dateObj.toLocaleDateString("en-US", {
                              timeZone: "America/New_York",
                            })}{" "}
                            at{" "}
                            {event.dateObj.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "America/New_York",
                              timeZoneName: "short",
                            })}
                          </Typography>
                        </InfoLine>
                        <InfoLine data-tina-field={tinaField(event, "address")}>
                          <InfoIcon>
                            <StyledLocationOn />
                          </InfoIcon>
                          <Typography variant="body1">
                            {event.address}
                          </Typography>
                        </InfoLine>
                        {event.description && (
                          <DescriptionPreview
                            data-tina-field={tinaField(event, "description")}
                          >
                            <Typography variant="body2" color="text.secondary">
                              <TinaMarkdown content={event.description} />
                            </Typography>
                          </DescriptionPreview>
                        )}
                      </StyledCardContent>
                      <StyledCardActions>
                        {event.showInstagramButton && event.instagramLink && (
                          <Button
                            onClick={(e) =>
                              handleInstaClick(e, event.instagramLink!)
                            }
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<Instagram />}
                            aria-label={`View Instagram post for ${event.title}`}
                            data-tina-field={tinaField(event, "instagramLink")}
                          >
                            {data.instaButtonText || "Check the insta"}
                          </Button>
                        )}
                      </StyledCardActions>
                    </EventInfoContainer>
                  </StyledCardActionArea>
                </StyledEventCard>
              ) : null
            )
          ) : (
            <NoEventsTypography
              variant="h5"
              color="text.secondary"
              data-tina-field={tinaField(data, "noEventsText")}
            >
              {data.noEventsText}
            </NoEventsTypography>
          )}
        </Stack>
      </EventListContainer>
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Make sure you actually wanna delete you cannot undelete this event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
