"use client";
import {
  PageBlocksImage_Gallery,
  PageBlocksImage_galleryImages,
} from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container, Typography, Grid, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(8, 0),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

const GalleryImageCard = styled(Card)({
  width: "100%",
  paddingTop: "100%",
  position: "relative",
});

const GalleryImage = styled(CardMedia)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const ImageGalleryBlock = ({
  data,
}: {
  data: PageBlocksImage_Gallery;
}) => {
  if (!data?.images) return null;

  return (
    <Container maxWidth="lg" data-tina-field={tinaField(data)}>
      <Section>
        {data.title && (
          <SectionTitle variant="h2" data-tina-field={tinaField(data, "title")}>
            {data.title}
          </SectionTitle>
        )}
        <Grid container spacing={2}>
          {data.images.map(
            (image: PageBlocksImage_galleryImages | null, i: number) =>
              image && (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <GalleryImageCard data-tina-field={tinaField(image)}>
                    <GalleryImage
                      component="img"
                      image={image.src ?? ""}
                      alt={image.alt ?? ""}
                    />
                  </GalleryImageCard>
                </Grid>
              )
          )}
        </Grid>
      </Section>
    </Container>
  );
};
