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
      label: "For screen readers",
      required: true,
    },
  ],
});

const createButtonField = (name = "button", label = "Button") => ({
  type: "object" as const,
  name,
  label,
  fields: [
    {
      type: "string",
      name: "text",
      label: "Button Text",
      required: true,
    },
    {
      type: "string",
      name: "link",
      label: "Button Link/URL",
      required: true,
    },
  ],
});

const topBannerBlock = {
  name: "top_banner",
  label: "Top Banner",
  ui: {
    itemProps: () => ({ label: "Top Banner" }),
  },
  fields: [createImageField("logo", "WasteKnotOrlando Logo Image")],
};

const eventSpotlightBlock = {
  name: "event_spotlight",
  label: "Event Spotlight",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `Event Spotlight: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title",
      required: true,
    },
    {
      type: "reference",
      label: "Fallback Event (if no upcoming events)",
      name: "event",
      collections: ["event"],
      required: false,
    },
  ],
};

const quickLinksBlock = {
  name: "quick_links",
  label: "Quick Links",
  ui: {
    itemProps: () => ({ label: "Quick Links" }),
  },
  fields: [
    {
      type: "object",
      label: "Link Items",
      name: "links",
      list: true,
      ui: {
        itemProps: (item: { title?: string }) => ({
          label: item.title || "New Link",
        }),
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
          description: "Icons from materialUI library",
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
};

const missionStatementBlock = {
  name: "mission_statement",
  label: "Mission Statement",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `Mission Statement: ${item.title || "No Title"}`,
    }),
  },
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
};

const teamBoardBlock = {
  name: "team_board",
  label: "Team/Board Section",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `Team/Board: ${item.title || "No Title"}`,
    }),
  },
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
        itemProps: (item: { name?: string }) => ({
          label: item.name || "New Member",
        }),
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
};

const donationBlock = {
  name: "donation_section",
  label: "Donation Section",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `Donation Section: ${item.title || "No Title"}`,
    }),
  },
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
};

const volunteerBlock = {
  name: "volunteer_section",
  label: "Volunteer/Collaborate Section",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `Volunteer Section: ${item.title || "No Title"}`,
    }),
  },
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
        itemProps: (item: { title?: string }) => ({
          label: item.title || "New Card",
        }),
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
        createButtonField("button", "Card Button"),
      ],
    },
  ],
};

const faqBlock = {
  name: "faq",
  label: "FAQ Section",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `FAQ: ${item.title || "No Title"}`,
    }),
  },
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
        itemProps: (item: { question?: string }) => ({
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
};

const richTextContentBlock = {
  name: "rich_text_content",
  label: "Rich Text Content",
  ui: {
    itemProps: () => ({ label: "Rich Text Content" }),
  },
  fields: [
    {
      type: "string",
      name: "align",
      label: "Text Alignment",
      options: ["left", "center", "right"],
      ui: {
        component: "select",
      },
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

const eventsListingBlock = {
  name: "events_listing",
  label: "Events Listing",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `Events Listing: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title",
      required: true,
    },
    {
      type: "string",
      name: "noEventsText",
      label: "Text when no events.",
      required: true,
      description: "'sorry broskis no events'",
    },
  ],
};

const interactiveCalendarBlock = {
  name: "interactive_calendar",
  label: "Interactive Calendar",
  ui: {
    itemProps: (item: { title?: string }) => ({
      label: `Calendar: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title",
      required: true,
    },
  ],
};

const schema = defineSchema({
  collections: [
    {
      label: "Global",
      name: "global",
      path: "content/global",
      format: "mdx",
      ui: {
        global: true,
        allowedActions: {
          create: false,
          delete: false,
        },
      },
      fields: [
        {
          type: "object",
          name: "header",
          label: "Header Settings",
          fields: [
            createImageField("logo", "Header Logo"),
            {
              type: "object",
              name: "navLinks",
              label: "Navigation Links",
              list: true,
              ui: {
                itemProps: (item: { title?: string }) => ({
                  label: item.title || "New Link",
                }),
              },
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Title",
                  required: true,
                },
                { type: "string", name: "path", label: "Path", required: true },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "footer",
          label: "Footer Settings",
          fields: [
            createImageField("logo", "Footer Logo"),
            { type: "string", name: "contactEmail", label: "Contact Email" },
          ],
        },
        {
          type: "object",
          name: "socials",
          label: "Social Links",
          fields: [
            { type: "string", name: "instagramUrl", label: "Instagram URL" },
            {
              type: "string",
              name: "donationUrl",
              label: "Donation URL (Zeffy URL)",
            },
          ],
        },
      ],
    },
    {
      label: "Pages",
      name: "page",
      path: "content/pages",
      format: "mdx",
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/wasteknotorlando/`;
          }
          return `/wasteknotorlando/${document._sys.filename}`;
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
          label: "Page Sections (Blocks)",
          name: "blocks",
          list: true,
          templates: [
            topBannerBlock,
            eventSpotlightBlock,
            quickLinksBlock,
            missionStatementBlock,
            teamBoardBlock,
            donationBlock,
            volunteerBlock,
            faqBlock,
            richTextContentBlock,
            eventsListingBlock,
            interactiveCalendarBlock,
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
        router: ({ document }) => {
          return `/wasteknotorlando/events/${document._sys.filename}`;
        },
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
    basePath: "wasteknotorlando",
  },
  admin: {
    basePath: "/wasteknotorlando",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  schema,
  client: {},
});
