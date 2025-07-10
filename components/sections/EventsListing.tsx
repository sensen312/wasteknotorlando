"use client";
import { useMemo } from "react";
import NextLink from "next/link";
import {
  Event,
  PageBlocksEvents_listing,
  EventLayoutEvent_content,
  PageBlocksRich_text_content,
} from "@/tina/__generated__/types";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocationOn, CalendarToday, Instagram } from "@mui/icons-material";
import { tinaField } from "tinacms/dist/react";

type UpcomingEvent = Event & {
  dateObj: Date;
};

type RichTextNode = {
  type: string;
  text?: string;
  children?: RichTextNode[];
};

type RichTextAST = {
  type: "root";
  children: RichTextNode[];
};

function isRichTextAST(body: unknown): body is RichTextAST {
  if (typeof body !== "object" || body === null) return false;
  const potentialAST = body as Partial<RichTextAST>;
  return potentialAST.type === "root" && Array.isArray(potentialAST.children);
}

const getEventPreviewText = (layout: Event["layout"]): string => {
  if (!layout) return "";

  const contentBlock = layout.find(
    (block): block is EventLayoutEvent_content =>
      block?.__typename === "EventLayoutEvent_content"
  );
  if (!contentBlock?.contentBlocks) return "";

  const textBlock = contentBlock.contentBlocks.find(
    (block): block is PageBlocksRich_text_content =>
      block?.__typename === "PageBlocksRich_text_content"
  );

  if (!textBlock || !isRichTextAST(textBlock.body)) {
    return "";
  }

  let text = "";
  const extractText = (nodes: RichTextNode[]) => {
    for (const node of nodes) {
      if (node.type === "text" && node.text) {
        text += node.text + " ";
      }
      if (node.children) {
        extractText(node.children);
      }
    }
  };

  extractText(textBlock.body.children);
  return text.trim();
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
  flexDirection: "column",
  [theme.breakpoints.up("md")]: { flexDirection: "row" },
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  overflow: "hidden",
  "&:hover": { transform: "translateY(-4px)", boxShadow: theme.shadows[6] },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: { flexDirection: "row" },
  width: "100%",
  alignItems: "stretch",
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

const DescriptionPreview = styled(Typography)({
  marginTop: "16px",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
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

export default function EventsListing({
  data,
  allEvents = [],
}: {
  data: PageBlocksEvents_listing;
  allEvents?: Event[];
}) {
  const handleInstaClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const upcomingEvents = useMemo(() => {
    if (!allEvents) return [];

    const tz = "America/New_York";
    const now = new Date();
    const todayStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
    const today = new Date(`${todayStr}T00:00:00.000-04:00`);

    return allEvents
      .filter((event): event is Event => !!event)
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
      <EventListContainer data-tina-field={tinaField(data, "events")}>
        <Stack spacing={5}>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) =>
              event?._sys?.filename ? (
                <StyledEventCard
                  key={event.id}
                  data-tina-field={tinaField(event)}
                >
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
                        <DescriptionPreview
                          variant="body2"
                          color="text.secondary"
                        >
                          {getEventPreviewText(event.layout)}
                        </DescriptionPreview>
                      </StyledCardContent>
                      <StyledCardActions>
                        {event.instagramLink && (
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
    </PageContainer>
  );
}
