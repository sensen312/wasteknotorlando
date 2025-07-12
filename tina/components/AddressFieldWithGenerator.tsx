import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import type { Form, FieldHookConfig } from "tinacms";

const Maps_API_KEY = process.env.NEXT_PUBLIC_Maps_API_KEY;

interface EventFormShape {
  address: string;
  googleMapsLink: string;
  appleMapsLink: string;
  embedMapSrc: string;
  [key: string]: unknown;
}

interface AddressFieldProps {
  form: Form<EventFormShape>;
  input: FieldHookConfig<string, EventFormShape>["input"];
}

const AddressFieldWithGenerator = (props: AddressFieldProps) => {
  const { form, input } = props;
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const addressValue = form.getState().values.address;

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (addressValue && addressValue.trim() !== "") {
        const encodedAddress = encodeURIComponent(addressValue);

        const newGoogleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        const newAppleMapsLink = `https://maps.apple.com/?q=${encodedAddress}`;
        let newEmbedMapSrc = "";

        if (Maps_API_KEY) {
          newEmbedMapSrc = `<iframe width="100%" height="450" style="border:0;" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=${Maps_API_KEY}&q=${encodedAddress}"></iframe>`;
        } else {
          form.alerts.error("We are missing google api key ;-;.");
        }

        const currentValues = form.getState().values;
        let changed = false;

        if (currentValues.googleMapsLink !== newGoogleMapsLink) {
          form.change("googleMapsLink", newGoogleMapsLink);
          changed = true;
        }
        if (currentValues.appleMapsLink !== newAppleMapsLink) {
          form.change("appleMapsLink", newAppleMapsLink);
          changed = true;
        }
        if (currentValues.embedMapSrc !== newEmbedMapSrc) {
          form.change("embedMapSrc", newEmbedMapSrc);
          changed = true;
        }

        if (changed) {
          form.alerts.success("Map links automatically generated.");
        }
      }
    }, 1500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [addressValue, form]);

  return (
    <TextField
      {...input}
      fullWidth
      variant="outlined"
      label="Event Address"
      id={input.name}
    />
  );
};

export default AddressFieldWithGenerator;
