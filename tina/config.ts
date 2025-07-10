import { defineConfig, defineSchema, Template } from "tinacms";
import { format, parseISO } from "date-fns";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

type ItemProps = Record<string, unknown>;

const createRequiredStringField = (
  label: string,
  name: string,
  description?: string
) => ({
  type: "string" as const,
  label,
  name,
  required: true,
  description: `(Required) ${description || ""}`,
});

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
      ...createRequiredStringField(
        "Alternative Text",
        "alt",
        "For screen readers."
      ),
    },
  ],
});

const createButtonField = (name = "button", label = "Button") => ({
  type: "object" as const,
  name,
  label,
  fields: [
    createRequiredStringField("Button Text", "text"),
    createRequiredStringField("Button Link/URL", "link"),
  ],
});

const richTextTemplates: Template[] = [
  {
    name: "Callout",
    label: "Callout Box",
    fields: [
      { name: "header", label: "Header", type: "string" },
      { name: "text", label: "Text", type: "string" },
      {
        name: "color",
        label: "Color",
        type: "string",
        options: ["primary", "secondary", "gray"],
      },
    ],
  },
  {
    name: "Button",
    label: "Button",
    fields: [
      createRequiredStringField("Text", "text"),
      createRequiredStringField("URL", "url"),
      {
        name: "style",
        label: "Style",
        type: "string",
        options: ["primary", "secondary"],
      },
    ],
  },
  {
    name: "VideoPlayer",
    label: "Video Player",
    fields: [createRequiredStringField("Video URL like Youtube URL", "url")],
  },
];

const topBannerBlock: Template = {
  name: "top_banner",
  label: "Top Banner",
  ui: {
    itemProps: () => ({
      label: "Top Banner",
    }),
  },
  fields: [createImageField("logo", "WasteKnotOrlando Logo Image")],
};

const sectionHeaderBlock: Template = {
  name: "section_header",
  label: "Section Header",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Header: ${item.title || "New Header"}`,
    }),
  },
  fields: [
    createRequiredStringField("Title", "title"),
    { type: "string", name: "subtitle", label: "Subtitle" },
    {
      type: "string",
      name: "align",
      label: "Alignment",
      options: ["left", "center", "right"],
      ui: { component: "select" },
    },
  ],
};

const richTextContentBlock: Template = {
  name: "rich_text_content",
  label: "Rich Text Content",
  ui: { itemProps: () => ({ label: "Rich Text Content" }) },
  fields: [
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: richTextTemplates,
    },
    {
      type: "string",
      name: "align",
      label: "Text Alignment",
      options: ["left", "center", "right"],
      ui: { component: "select" },
    },
  ],
};

const twoColumnBlock: Template = {
  name: "two_column",
  label: "Two-Column Layout",
  ui: { itemProps: () => ({ label: "Two-Column Layout" }) },
  fields: [
    {
      name: "left",
      label: "Left Column",
      type: "rich-text",
      templates: richTextTemplates,
    },
    {
      name: "right",
      label: "Right Column",
      type: "rich-text",
      templates: richTextTemplates,
    },
  ],
};

const imageGalleryBlock: Template = {
  name: "image_gallery",
  label: "Image Gallery",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Gallery: ${item.title || "New Image Gallery"}`,
    }),
  },
  fields: [
    createRequiredStringField("Gallery Title", "title"),
    {
      type: "object",
      name: "images",
      label: "Images",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({ label: item.alt || "New Image" }),
      },
      fields: [
        { type: "image", name: "src", label: "Image File", required: true },
        createRequiredStringField("Alternative Text", "alt"),
      ],
    },
  ],
};

const buttonGroupBlock: Template = {
  name: "button_group",
  label: "Button Group",
  ui: { itemProps: () => ({ label: "Button Group" }) },
  fields: [
    {
      type: "object",
      name: "buttons",
      label: "Buttons",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({ label: item.text || "New Button" }),
      },
      fields: [
        createRequiredStringField("Button Text", "text"),
        createRequiredStringField("Button Link", "link"),
      ],
    },
  ],
};

const eventSpotlightBlock: Template = {
  name: "event_spotlight",
  label: "Event Spotlight",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Event Spotlight: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    createRequiredStringField("Section Title", "title"),
    {
      type: "reference",
      label: "Event to Feature",
      name: "event",
      description:
        "Select an event to spotlight. If empty, the next upcoming event will be used.",
      collections: ["event"],
      required: false,
    },
  ],
};

const quickLinksBlock: Template = {
  name: "quick_links",
  label: "Quick Links",
  ui: { itemProps: () => ({ label: "Quick Links" }) },
  fields: [
    {
      type: "object",
      label: "Link Items",
      name: "links",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({ label: item.title || "New Link" }),
      },
      fields: [
        createRequiredStringField("Title", "title"),
        createRequiredStringField(
          "Icon Name",
          "icon",
          "Find icon names from materialUI library."
        ),
        createRequiredStringField("URL", "href"),
      ],
    },
    {
      type: "object",
      label: "Work With Us Button",
      name: "workWithUs",
      fields: [
        createRequiredStringField("Collaborate Form URL", "collaborateLink"),
        createRequiredStringField("Volunteer Form URL", "volunteerLink"),
      ],
    },
  ],
};

const missionStatementBlock: Template = {
  name: "mission_statement",
  label: "Mission Statement",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Mission Statement: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    createImageField(),
    createRequiredStringField("Title", "title"),
    {
      type: "rich-text",
      name: "statement",
      label: "Statement",
      required: true,
      description: "(Required)",
      templates: richTextTemplates,
    },
  ],
};

const zeffyDonationBlock: Template = {
  name: "zeffy_donation",
  label: "Zeffy Donation Block",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Zeffy: ${item.title || "New Zeffy Block"}`,
    }),
  },
  fields: [
    createRequiredStringField("Title", "title"),
    createRequiredStringField(
      "Text",
      "text",
      "Description for Zeffy donations."
    ),
    createRequiredStringField("Button Text", "buttonText"),
    {
      ...createRequiredStringField("Zeffy Donation URL", "zeffyLink"),
      ui: { component: "textarea" },
    },
  ],
};

const itemDonationListBlock: Template = {
  name: "item_donation_list",
  label: "Item Donation List",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Donation Lists: ${item.title || ""}`,
    }),
  },
  fields: [
    createRequiredStringField("Section Title", "title"),
    createRequiredStringField("Accepted Header", "acceptedHeader"),
    {
      type: "string",
      name: "acceptedItems",
      list: true,
      label: "Accepted Items List",
    },
    createRequiredStringField("Not Accepted Header", "notAcceptedHeader"),
    {
      type: "string",
      name: "notAcceptedItems",
      list: true,
      label: "Not Accepted Items List",
    },
  ],
};

const eventsListingBlock: Template = {
  name: "events_listing",
  label: "Events Listing",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Events Listing: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    createRequiredStringField("Section Title", "title"),
    createRequiredStringField("Text when no events.", "noEventsText"),
    createRequiredStringField("Instagram Button Text", "instaButtonText"),
    {
      type: "object",
      name: "events",
      label: "Events",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({
          label:
            item && typeof item.event === "string"
              ? item.event.split("/").pop().replace(".mdx", "")
              : "New Event",
        }),
      },
      fields: [
        {
          type: "reference",
          name: "event",
          label: "Event",
          collections: ["event"],
        },
      ],
    },
  ],
};

const interactiveCalendarBlock: Template = {
  name: "interactive_calendar",
  label: "Interactive Calendar",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Calendar: ${item.title || "No Title"}`,
    }),
  },
  fields: [createRequiredStringField("Section Title", "title")],
};

const teamBoardBlock: Template = {
  name: "team_board",
  label: "Team/Board Section",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Team/Board: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    createRequiredStringField("Section Title", "title"),
    {
      type: "object",
      name: "members",
      label: "Team Members",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({ label: item.name || "New Member" }),
      },
      fields: [
        createRequiredStringField("Name", "name"),
        createRequiredStringField("Role", "role"),
        createImageField("photo", "Member Photo"),
      ],
    },
  ],
};

const volunteerBlock: Template = {
  name: "volunteer_section",
  label: "Volunteer/Collaborate Section",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Volunteer Section: ${item.title || "No Title"}`,
    }),
  },
  fields: [
    createRequiredStringField("Section Title", "title"),
    { type: "string", name: "subtitle", label: "Subtitle" },
    {
      type: "object",
      name: "cards",
      label: "Info Cards",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({ label: item.title || "New Card" }),
      },
      fields: [
        createRequiredStringField("Card Title", "title"),
        createRequiredStringField("Card Description", "description"),
        createButtonField("button", "Card Button"),
      ],
    },
  ],
};

const faqBlock: Template = {
  name: "faq",
  label: "FAQ Section",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `FAQ: ${item.title || "New Question"}`,
    }),
  },
  fields: [
    createRequiredStringField("Section Title", "title"),
    {
      type: "object",
      name: "questions",
      label: "Questions",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({
          label: item.question || "New Question",
        }),
      },
      fields: [
        createRequiredStringField("Question", "question"),
        {
          type: "rich-text",
          name: "answer",
          label: "Answer",
          required: true,
          description: "(Required)",
          templates: richTextTemplates,
        },
      ],
    },
  ],
};

const eventDetailsBlock: Template = {
  name: "event_details",
  label: "Event Details",
  ui: { itemProps: () => ({ label: "Event Details" }) },
  fields: [
    {
      type: "string",
      name: "placeholder",
      label: "This block pulls Title, Date, and Address from the fields above.",
      ui: { component: "hidden" },
    },
  ],
};

const eventImageBlock: Template = {
  name: "event_image",
  label: "Event Image",
  ui: { itemProps: () => ({ label: "Event Image" }) },
  fields: [
    {
      type: "string",
      name: "placeholder",
      ui: { component: "hidden" },
      label: "This block pulls the main event image from the field above.",
    },
  ],
};
const eventDirectionsBlock: Template = {
  name: "event_directions",
  label: "Event Directions",
  ui: { itemProps: () => ({ label: "Event Directions" }) },
  fields: [
    {
      type: "string",
      name: "placeholder",
      ui: { component: "hidden" },
      label: "This block shows the map links and copyable address.",
    },
  ],
};
const eventMapEmbedBlock: Template = {
  name: "event_map_embed",
  label: "Event Map Embed",
  ui: { itemProps: () => ({ label: "Event Map Embed" }) },
  fields: [
    {
      type: "string",
      name: "placeholder",
      ui: { component: "hidden" },
      label: "This block displays the embedded Google map.",
    },
  ],
};
const eventContentBlock: Template = {
  name: "event_content",
  label: "Event Content",
  ui: { itemProps: () => ({ label: "Event Page Content" }) },
  fields: [
    {
      type: "object",
      label: "Page Content (Blocks)",
      name: "contentBlocks",
      list: true,
      templates: [
        sectionHeaderBlock,
        richTextContentBlock,
        twoColumnBlock,
        imageGalleryBlock,
        buttonGroupBlock,
      ],
    },
  ],
};

const allPageBlockTemplates: Template[] = [
  topBannerBlock,
  sectionHeaderBlock,
  richTextContentBlock,
  twoColumnBlock,
  faqBlock,
  imageGalleryBlock,
  buttonGroupBlock,
  interactiveCalendarBlock,
  missionStatementBlock,
  quickLinksBlock,
  eventSpotlightBlock,
  teamBoardBlock,
  volunteerBlock,
  zeffyDonationBlock,
  itemDonationListBlock,
  eventsListingBlock,
];

const allEventLayoutBlocks: Template[] = [
  eventDetailsBlock,
  eventImageBlock,
  eventDirectionsBlock,
  eventMapEmbedBlock,
  eventContentBlock,
];

const schema = defineSchema({
  collections: [
    {
      label: "Site Settings",
      name: "global",
      path: "content/global",
      format: "mdx",
      ui: {
        global: true,
        allowedActions: { create: false, delete: false },
      },
      fields: [
        {
          type: "object",
          name: "announcement",
          label: "Announcement Banner",
          fields: [
            { type: "boolean", name: "show", label: "Show Announcement?" },
            { type: "string", name: "text", label: "Announcement Text" },
            createButtonField("button", "Announcement Button"),
          ],
        },
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
                itemProps: (item: ItemProps) => ({
                  label: item.title || "New Link",
                }),
              },
              fields: [
                createRequiredStringField("Title", "title"),
                createRequiredStringField("Path", "path"),
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
            createRequiredStringField("Contact Header", "contactHeader"),
            createRequiredStringField("Contact Email", "contactEmail"),
            createRequiredStringField("Socials Header", "socialsHeader"),
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
        router: ({ document }: { document: { _sys: { filename: string } } }) =>
          document._sys.filename === "home"
            ? `/`
            : `/${document._sys.filename}`,
      },
      fields: [
        createRequiredStringField("Title", "title"),
        {
          type: "object",
          label: "Page Sections (Blocks)",
          name: "blocks",
          list: true,
          templates: allPageBlockTemplates,
        },
      ],
    },
    {
      label: "Events",
      name: "event",
      path: "content/events",
      format: "mdx",
      ui: {
        router: ({ document }: { document: { _sys: { filename: string } } }) =>
          `/events/${document._sys.filename}`,
        filename: {
          slugify: (values: { date?: string; title?: string }) => {
            const date = values.date ? parseISO(values.date) : new Date();
            const datePart = format(date, "yyyy-MM-dd");
            const titlePart = (values.title || "new-event")
              .toLowerCase()
              .replace(/[^a-z0-9]/gi, "-");
            return `${datePart}-${titlePart}`;
          },
        },
      },
      fields: [
        createRequiredStringField("Event Title", "title"),
        {
          type: "string",
          name: "type",
          label: "Event Type",
        },
        {
          type: "datetime",
          name: "date",
          label: "Date & Time",
          required: true,
          description: "(Required)",
          ui: { timeFormat: "HH:mm" },
        },
        createImageField(),
        createRequiredStringField("Address", "address"),
        {
          type: "string",
          name: "directionsHeader",
          label: "Directions Header Text",
          description: "Default: Get Directions",
        },
        { type: "string", name: "googleMapsLink", label: "Google Maps Link" },
        { type: "string", name: "appleMapsLink", label: "Apple Maps Link" },
        { type: "string", name: "embedMapSrc", label: "Google Maps Embed URL" },
        { type: "string", name: "instagramLink", label: "Instagram Link" },
        {
          type: "string",
          name: "instagramButtonText",
          label: "Instagram Button Text",
          description: "Default: View on Insta",
        },
        {
          type: "boolean",
          name: "showSignUpButton",
          label: "Show the Sign-Up Button?",
        },
        { type: "string", name: "signUpLink", label: "Sign-Up Form URL" },
        {
          type: "object",
          label: "Event Page Layout",
          name: "layout",
          list: true,
          description:
            "Arrange layout of events here you can even add in new sections.",
          templates: allEventLayoutBlocks,
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
    basePath: "",
  },
  admin: {
    basePath: "",
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
