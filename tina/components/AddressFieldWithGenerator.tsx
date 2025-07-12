import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import type { Form } from "@tinacms/toolkit";
import type { FieldHookConfig } from "tinacms";

const Maps_API_KEY = process.env.NEXT_PUBLIC_Maps_API_KEY;

interface AddressFieldProps {
  form: Form;
  input: FieldHookConfig<string>["input"];
}

const AddressFieldWithGenerator = (props: AddressFieldProps) => {
  const { form, input } = props;
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const address = form.getFieldState("address")?.value;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (address && address.trim() !== "") {
        if (!Maps_API_KEY) {
          form.alerts.error("Google Maps API key is missing.");
          return;
        }

        const encodedAddress = encodeURIComponent(address);
        const newGoogleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        const newAppleMapsLink = `https://maps.apple.com/?q=${encodedAddress}`;
        const newEmbedMapSrc = `<iframe width="100%" height="450" style="border:0;" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=${Maps_API_KEY}&q=${encodedAddress}"></iframe>`;

        form.change("googleMapsLink", newGoogleMapsLink);
        form.change("appleMapsLink", newAppleMapsLink);
        form.change("embedMapSrc", newEmbedMapSrc);
        form.alerts.success("Map links automatically generated.");
      }
    }, 1500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [form.getFieldState("address")?.value, form]);

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
