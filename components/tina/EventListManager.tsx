"use client";
import React, { useState } from "react";
import { useCMS, type FieldProps } from "@tinacms/toolkit";
import {
  Button,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import { format } from "date-fns";
import slugify from "slugify";

// creates new event in collection
export const EventListManager = (props: FieldProps) => {
  const cms = useCMS();
  const [loading, setLoading] = useState(false);

  const handleCreateAndAdd = async () => {
    setLoading(true);
    const defaultTitle = `New Event ${format(new Date(), "yyyy-MM-dd HH:mm")}`;

    const slug = slugify(defaultTitle, { lower: true, strict: true });
    const dateSlug = format(new Date(), "yyyy-MM-dd");
    const relativePath = `${dateSlug}-${slug}.mdx`;

    try {
      const newEventResponse = await cms.api.tina.mutations.createDocument({
        collection: "event",
        relativePath: relativePath,
        params: {
          title: defaultTitle,
          type: "Event Type",
          date: new Date().toISOString(),
          address: "Event Location",
          image: {
            src: "/uploads/image-placeholder.png",
            alt: "A placeholder image for a new event",
          },
          googleMapsLink: "#",
          appleMapsLink: "#",
          embedMapSrc: "#",
          instagramLink: "https://www.instagram.com/WasteKnotOrlando",
          body: "Event description goes here.",
        },
      });

      const newEventPath = newEventResponse.data.createDocument._sys.path;

      const currentList = props.input.value || [];

      const newList = [...currentList, { event: newEventPath }];
      props.input.onChange(newList);
      cms.alerts.success("Successfully created and added new event!");
    } catch (error) {
      console.error("Failed to create and add new event:", error);
      cms.alerts.error("Error creating new event ;-;");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index: number) => {
    const currentList = props.input.value || [];
    const newList = [...currentList];
    newList.splice(index, 1);
    props.input.onChange(newList);
  };

  const handleEdit = (eventPath: string) => {
    const relativePath = eventPath.split("content/events/").pop();
    if (relativePath) {
      cms.redirect(`/admin/#/collections/event/documents/${relativePath}`);
    }
  };

  const currentEvents: { event: string }[] = props.input.value || [];

  return (
    <Paper
      variant="outlined"
      sx={{ padding: 2, borderColor: "rgba(0, 0, 0, 0.23)", mt: 1 }}
    >
      <Typography
        variant="h6"
        component="label"
        sx={{ mb: 2, display: "block" }}
      >
        {props.field.label}
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Button
          onClick={handleCreateAndAdd}
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <AddCircleOutline />
            )
          }
          disabled={loading}
        >
          Create & Add New Event
        </Button>
      </Stack>
      <Divider sx={{ mb: 1 }} />
      {currentEvents.length > 0 ? (
        <List dense>
          {currentEvents.map((item, index) => {
            if (!item || !item.event) return null;

            const displayName =
              item.event?.split("/").pop()?.replace(".mdx", "") ||
              "Invalid Reference";

            return (
              <ListItem
                key={`${item.event}-${index}`}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(item.event)}
                      sx={{ mr: 1 }}
                      title="Edit Event"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemove(index)}
                      title="Remove Event from list"
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={displayName} />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
          No events added yet.
        </Typography>
      )}
    </Paper>
  );
};
