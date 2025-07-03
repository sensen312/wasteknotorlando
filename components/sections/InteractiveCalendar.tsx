"use client";
import React, { useState, useMemo } from "react";
import NextLink from "next/link";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface Event {
  id: number;
  slug: string;
  title: string;
  date: string;
  time?: string;
}

interface InteractiveCalendarProps {
  events: Event[];
}

const CalendarSectionContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(8, 0),
}));

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

const PageTitleWrapper = styled(Box)({
  textAlign: "center",
  marginBottom: "40px",
});

const CalendarPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  background: theme.palette.background.default,
}));

const CalendarHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

const WeekDaysGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  textAlign: "center",
  marginBottom: "8px",
  gap: "4px",
});

const WeekDayText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.text.secondary,
}));

const DaysGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridAutoRows: theme.breakpoints.down("sm") ? "11.2vw" : "130px",
  gap: "4px",
}));

const DayCell = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
  },
}));

const DayNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

// Finally fixed the event boxes DO NOT CHANGE THIS
const EventsContainer = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  marginTop: "4px",
});

// Dots for mobile so you can see it
const EventDotsContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  padding: "2px",
  position: "absolute",
  top: "24px",
  left: "4px",
});

const EventItem = styled(Link)(({ theme }) => ({
  display: "block",
  backgroundColor: alpha(theme.palette.primary.main, 0.85),
  color: theme.palette.primary.contrastText,
  borderRadius: "4px",
  padding: "4px 6px",
  marginBottom: "4px",
  textDecoration: "none",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const EventDot = styled(Link)(({ theme }) => ({
  height: "8px",
  width: "8px",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "50%",
  display: "inline-block",
}));

const EventTitleText = styled(Typography)({
  fontWeight: "bold",
  fontSize: "0.75rem",
  lineHeight: 1.2,
  whiteSpace: "normal",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const EventTimeText = styled(Typography)({
  fontSize: "0.7rem",
  lineHeight: 1,
  opacity: 0.85,
  marginTop: "2px",
});

const DayCellBlank = styled(Box)({});

export default function InteractiveCalendar({
  events,
}: InteractiveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const eventsForMonth = useMemo(() => {
    const eventsMap = new Map<number, (Event & { dateObj: Date })[]>();
    events.forEach((event) => {
      const eventDate = new Date(event.date);
      eventDate.setMinutes(
        eventDate.getMinutes() + eventDate.getTimezoneOffset()
      );

      if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
        const day = eventDate.getDate();
        if (!eventsMap.has(day)) {
          eventsMap.set(day, []);
        }
        eventsMap.get(day)?.push({ ...event, dateObj: eventDate });
      }
    });

    eventsMap.forEach((dayEvents) => {
      dayEvents.sort((a, b) => {
        const timeA = a.time ? new Date(`1970/01/01 ${a.time}`) : 0;
        const timeB = b.time ? new Date(`1970/01/01 ${b.time}`) : 0;
        return timeA.valueOf() - timeB.valueOf();
      });
    });
    return eventsMap;
  }, [year, month, events]);

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // To make it consistent Jan is 1
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ key: `blank-start-${i}`, day: null, events: [] });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      key: `day-${i}`,
      day: i,
      events: eventsForMonth.get(i) || [],
    });
  }

  const totalCells = calendarDays.length;
  const remainingCells = 7 - (totalCells % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      calendarDays.push({ key: `blank-end-${i}`, day: null, events: [] });
    }
  }

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <CalendarSectionContainer>
      <PageTitleWrapper>
        <PageTitle variant="h2" component="h2">
          Event Calendar:
        </PageTitle>
      </PageTitleWrapper>
      <CalendarPaper elevation={0}>
        <CalendarHeader>
          <IconButton onClick={handlePrevMonth} aria-label="Previous month">
            <ChevronLeft />
          </IconButton>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h3"
            sx={{ textAlign: "center" }}
          >
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </Typography>
          <IconButton onClick={handleNextMonth} aria-label="Next month">
            <ChevronRight />
          </IconButton>
        </CalendarHeader>
        <WeekDaysGrid>
          {daysOfWeek.map((day) => (
            <WeekDayText key={day} variant="body2">
              {isMobile ? day.substring(0, 3) : day}
            </WeekDayText>
          ))}
        </WeekDaysGrid>
        <DaysGrid>
          {calendarDays.map((dayObj) =>
            dayObj.day ? (
              <DayCell key={dayObj.key}>
                <DayNumber>{dayObj.day}</DayNumber>
                {isMobile ? (
                  <EventDotsContainer>
                    {dayObj.events.map((event) => (
                      <EventDot
                        key={event.id}
                        component={NextLink}
                        href={`/events/${event.slug}`}
                        passHref
                        aria-label={`Event: ${event.title}`}
                      />
                    ))}
                  </EventDotsContainer>
                ) : (
                  <EventsContainer>
                    {dayObj.events.map((event) => (
                      <EventItem
                        key={event.id}
                        component={NextLink}
                        href={`/events/${event.slug}`}
                        passHref
                      >
                        <EventTitleText>{event.title}</EventTitleText>
                        {event.time && (
                          <EventTimeText>{event.time}</EventTimeText>
                        )}
                      </EventItem>
                    ))}
                  </EventsContainer>
                )}
              </DayCell>
            ) : (
              <DayCellBlank key={dayObj.key} />
            )
          )}
        </DaysGrid>
      </CalendarPaper>
    </CalendarSectionContainer>
  );
}
