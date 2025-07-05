import { defineConfig, defineSchema } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const createImageField = (name = "image", label = "Image") => ({
  type: "object" as const,
  name,
  label,
  fields: [
    {
      type: "image" as const,
      name: "src",
      label: "Image File",
      required: true,
    },
    {
      type: "string" as const,
      name: "alt",
      label: "Image Description (Alt Text)",
      required: true,
      description: "For screen readers.",
    },
  ],
});

const schema = defineSchema({
  collections: [
    {
      label: "Pages",
      name: "page",
      path: "content/pages",
      format: "mdx",
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          return `/${document._sys.filename}`;
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          isTitle: true,
          required: true,
        },
        {
          type: "object",
          label: "Page Sections",
          name: "blocks",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.template?.replace(/_/g, " ") || "New Section",
            }),
          },
          templates: [
            {
              name: "top_banner",
              label: "Top Banner",
              fields: [createImageField("logo", "Logo Image")],
            },
            {
              name: "event_spotlight",
              label: "Event Spotlight",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Section Title",
                  required: true,
                },
                {
                  type: "reference",
                  label: "Select Event to Feature",
                  name: "event",
                  collections: ["event"],
                },
              ],
            },
            {
              name: "quick_links",
              label: "Quick Links",
              fields: [
                {
                  type: "object",
                  label: "Link Items",
                  name: "links",
                  list: true,
                  ui: {
                    itemProps: (item) => ({ label: item.title || "New Link" }),
                  },
                  fields: [
                    {
                      type: "string",
                      name: "title",
                      label: "Title",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon Name",
                      description:
                        "e.g., FavoriteBorder, Event, Email. From MUI icons.",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "href",
                      label: "URL",
                      required: true,
                    },
                  ],
                },
                {
                  type: "object",
                  label: "Work With Us Button",
                  name: "workWithUs",
                  fields: [
                    {
                      type: "string",
                      name: "collaborateLink",
                      label: "Collaborate Form URL",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "volunteerLink",
                      label: "Volunteer Form URL",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "mission_statement",
              label: "Mission Statement",
              fields: [
                createImageField(),
                {
                  type: "string",
                  name: "title",
                  label: "Title",
                  required: true,
                },
                {
                  type: "rich-text",
                  name: "statement",
                  label: "Statement",
                  required: true,
                },
              ],
            },
            {
              name: "team_board",
              label: "Team/Board Section",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Section Title",
                  required: true,
                },
                {
                  type: "object",
                  name: "members",
                  label: "Team Members",
                  list: true,
                  ui: {
                    itemProps: (item) => ({ label: item.name || "New Member" }),
                  },
                  fields: [
                    {
                      type: "string",
                      name: "name",
                      label: "Name",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "role",
                      label: "Role",
                      required: true,
                    },
                    createImageField("photo", "Member Photo"),
                  ],
                },
              ],
            },
            {
              name: "donation_section",
              label: "Donation Section",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Section Title",
                  required: true,
                },
                { type: "string", name: "subtitle", label: "Subtitle" },
                {
                  type: "string",
                  name: "zeffyTitle",
                  label: "Zeffy Card Title",
                  required: true,
                },
                {
                  type: "string",
                  name: "zeffyText",
                  label: "Zeffy Card Text",
                  required: true,
                },
                {
                  type: "string",
                  name: "zeffyLink",
                  label: "Zeffy Donation URL",
                  required: true,
                },
                {
                  type: "string",
                  name: "itemsTitle",
                  label: "Items Card Title",
                  required: true,
                },
                {
                  type: "string",
                  name: "acceptedHeader",
                  label: "Accepted Items Header",
                  required: true,
                },
                {
                  type: "string",
                  name: "acceptedItems",
                  list: true,
                  label: "Accepted Items List",
                },
                {
                  type: "string",
                  name: "notAcceptedHeader",
                  label: "Not Accepted Items Header",
                  required: true,
                },
                {
                  type: "string",
                  name: "notAcceptedItems",
                  list: true,
                  label: "Not Accepted Items List",
                },
              ],
            },
            {
              name: "volunteer_section",
              label: "Volunteer/Collaborate Section",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Section Title",
                  required: true,
                },
                { type: "string", name: "subtitle", label: "Subtitle" },
                {
                  type: "object",
                  name: "cards",
                  label: "Info Cards",
                  list: true,
                  ui: {
                    itemProps: (item) => ({ label: item.title || "New Card" }),
                  },
                  fields: [
                    {
                      type: "string",
                      name: "title",
                      label: "Card Title",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "description",
                      label: "Card Description",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "buttonText",
                      label: "Button Text",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "link",
                      label: "Button URL",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "faq",
              label: "FAQ Section",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Section Title",
                  required: true,
                },
                {
                  type: "object",
                  name: "questions",
                  label: "Questions",
                  list: true,
                  ui: {
                    itemProps: (item) => ({
                      label: item.question || "New Question",
                    }),
                  },
                  fields: [
                    {
                      type: "string",
                      name: "question",
                      label: "Question",
                      required: true,
                    },
                    {
                      type: "rich-text",
                      name: "answer",
                      label: "Answer",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "rich_text_content",
              label: "Rich Text Content",
              fields: [
                {
                  type: "rich-text",
                  name: "body",
                  label: "Body",
                  isBody: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      name: "event",
      path: "content/events",
      format: "mdx",
      ui: {
        router: ({ document }) => `/events/${document._sys.filename}`,
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Event Title",
          isTitle: true,
          required: true,
        },
        { type: "string", name: "type", label: "Event Type" },
        {
          type: "datetime",
          name: "date",
          label: "Date & Time",
          required: true,
          ui: { timeFormat: "HH:mm" },
        },
        createImageField(),
        { type: "string", name: "address", label: "Address", required: true },
        { type: "string", name: "googleMapsLink", label: "Google Maps Link" },
        { type: "string", name: "appleMapsLink", label: "Apple Maps Link" },
        { type: "string", name: "embedMapSrc", label: "Google Maps Embed URL" },
        { type: "string", name: "instagramLink", label: "Instagram Link" },
        {
          type: "rich-text",
          name: "body",
          label: "Description",
          isBody: true,
          required: true,
        },
      ],
    },
  ],
});

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  schema,
});
