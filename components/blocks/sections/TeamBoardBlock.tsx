"use client";
import { PageBlocksTeam_Board } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(8, 0),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: theme.palette.secondary.main,
    margin: "16px auto 0",
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  height: "100%",
  minWidth: "300px",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": { transform: "translateY(-4px)", boxShadow: theme.shadows[6] },
}));

const TeamMemberImage = styled(CardMedia)({
  aspectRatio: "1 / 1",
  objectFit: "cover",
});

const TeamMemberContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const RoleTypography = styled(Typography)({
  fontWeight: 700,
});

export const TeamBoardBlock = ({ data }: { data: PageBlocksTeam_Board }) => {
  return (
    <Container maxWidth="lg">
      <Section aria-labelledby="team-heading">
        <SectionTitle
          variant="h2"
          component="h2"
          id="team-heading"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </SectionTitle>
        <Grid container spacing={4} justifyContent="center">
          {data.members?.map((member) => (
            <Grid
              item
              key={member?.name}
              xs={12}
              sm={6}
              md={4}
              data-tina-field={tinaField(member!)}
            >
              <TeamMemberCard>
                <TeamMemberImage
                  component="img"
                  image={member?.photo?.src || ""}
                  alt={member?.photo?.alt || ""}
                  data-tina-field={tinaField(member!, "photo")}
                />
                <TeamMemberContent>
                  <Typography
                    variant="h3"
                    component="h3"
                    gutterBottom
                    data-tina-field={tinaField(member!, "name")}
                  >
                    {member?.name}
                  </Typography>
                  <RoleTypography
                    variant="h5"
                    component="p"
                    color="secondary"
                    data-tina-field={tinaField(member!, "role")}
                  >
                    {member?.role}
                  </RoleTypography>
                </TeamMemberContent>
              </TeamMemberCard>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Container>
  );
};
