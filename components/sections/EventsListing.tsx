"use client";
import { useMemo, useState, useEffect } from "react";
import NextLink from "next/link";
import { Event, PageBlocksEvents_listing } from "@/tina/__generated__/types";
import { format } from "date-fns";
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
  Archive as ArchiveIcon,
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
  WebkitLineClamp: 4,
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
  const [archiveTarget, setArchiveTarget] = useState<{
    relativePath: string;
    title: string;
  } | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInstaClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleAddEvent = () => {
    if (!cms) return;
    cms.redirect("/admin/index.html#/collections/new/event/~");
  };

  const handleEditEvent = (
    e: React.MouseEvent,
    relativePathWithExt: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cms) return;
    const relativePath = relativePathWithExt.replace(/\.mdx?$/, "");
    cms.redirect(`/admin/index.html#/collections/event/${relativePath}`);
  };

  const handleArchiveConfirmation = (event: Event) => {
    setArchiveTarget({
      relativePath: event._sys.filename,
      title: event.title,
    });
  };

  const handleArchive = async () => {
    if (!archiveTarget || !cms) return;
    try {
      await cms.api.tina.updateDocument({
        collection: "event",
        relativePath: `${archiveTarget.relativePath}.mdx`,
        params: {
          is_archived: true,
        },
      });
      cms.alerts.success(`Successfully archived event: ${archiveTarget.title}`);
      setArchiveTarget(null);
      // reloading page for now might need a better solution here later
      window.location.reload();
    } catch (error) {
      console.error("Could not archive event:", error);
      cms.alerts.error("Could not archive event ;-;");
    }
  };

  const upcomingEvents = useMemo(() => {
    if (!allEvents) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allEvents
      .filter(
        (event): event is Event => !!event && !!event.date && !event.is_archived
      )
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
      {isClient && isCmsEnabled && (
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
                  {isClient && isCmsEnabled && (
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
                          handleArchiveConfirmation(event);
                        }}
                        aria-label={`Archive ${event.title}`}
                      >
                        <ArchiveIcon fontSize="small" />
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
                            {isClient
                              ? format(
                                  new Date(event.date),
                                  "eeee, MMMM d, yyyy 'at' h:mm a"
                                )
                              : "..."}
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
        open={!!archiveTarget}
        onClose={() => setArchiveTarget(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Archival</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Archive the event so that it doesnt show up on the public site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArchiveTarget(null)}>Cancel</Button>
          <Button onClick={handleArchive} color="primary" autoFocus>
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
