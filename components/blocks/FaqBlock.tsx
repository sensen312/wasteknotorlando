"use client";
import { PageBlocksFaq } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { styled } from "@mui/material/styles";

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(8, 0),
}));
const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

export const FaqBlock = ({ data }: { data: PageBlocksFaq }) => {
  return (
    <Container maxWidth="md">
      <Section aria-labelledby="faq-heading">
        <SectionTitle
          variant="h2"
          component="h2"
          id="faq-heading"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </SectionTitle>
        <Box>
          {data.questions?.map((faq, index) => (
            <Accordion
              key={index}
              defaultExpanded={index === 0}
              data-tina-field={tinaField(faq!, "question")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography variant="h6">{faq?.question}</Typography>
              </AccordionSummary>
              <AccordionDetails data-tina-field={tinaField(faq!, "answer")}>
                <TinaMarkdown content={faq?.answer} />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Section>
    </Container>
  );
};
