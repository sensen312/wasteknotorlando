import { defineConfig, defineSchema, Template } from "tinacms";
import { format, parseISO } from "date-fns";
import slugify from "slugify";
import AddressFieldWithGenerator from "./components/AddressFieldWithGenerator";

const branch =
  process.env.CF_PAGES_BRANCH ||
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
      type: "string" as const,
      name: "src",
      label: "Image File",
      required: true,
      ui: {
        component: "image" as const,
      },
    },
    {
      ...createRequiredStringField(
        "Alternative Text",
        "alt",
        "For screen readers"
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
  ui: { itemProps: () => ({ label: "Top Banner" }) },
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
      description: "Select the event you want to spotlight.",
      collections: ["event"],
      required: false,
    },
    {
      type: "number",
      name: "banner_position",
      label: "Banner Image Vertical Position %",
      description:
        "Controls focus of banner image so that you can make it fit. 0=top of image, 50=center, 100=bottom. 40 is default.",
    },
    {
      type: "number",
      name: "banner_height_mobile",
      label: "Mobile Banner Height",
      description: "Set banner height in pixels for mobile. 200 is default.",
    },
    {
      type: "number",
      name: "banner_height_desktop",
      label: "Desktop Banner Height",
      description: "Set banner height in pixels for desktop. 300 is default.",
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
    createRequiredStringField("Text", "text", "Desc for Zeffy donations."),
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
    description: "Lets you display events.",
  },
  fields: [
    createRequiredStringField("Section Title", "title"),
    createRequiredStringField("Text when no events.", "noEventsText"),
    createRequiredStringField("Instagram Button Text", "instaButtonText"),
    {
      type: "object",
      name: "events",
      label: "Events List",
      list: true,
      description: "List of events.",
      ui: {
        itemProps: (item) => ({
          label:
            item.event?.replace("content/events/", "").replace(".mdx", "") ||
            "New Event Reference",
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
          description: "(Required!)",
          templates: richTextTemplates,
        },
      ],
    },
  ],
};

const canvaEmbedBlock: Template = {
  name: "canva_canvaembed",
  label: "Canva Embed",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: `Canva: ${item.title || "New Canva Embed"}`,
    }),
  },
  fields: [
    createRequiredStringField("Title", "title", "A title for organization."),
    {
      type: "string",
      name: "embedCode",
      label: "Canva Embed Code",
      required: true,
      description: "Paste the HTML embed code from Canva here.",
      ui: {
        component: "textarea",
      },
    },
  ],
};

const backButtonBlock: Template = {
  name: "back_button",
  label: "Back Button",
  ui: {
    itemProps: (item: { link?: string }) => ({
      label: `Back Button ➞ ${item.link || "No link ;-;"}`,
    }),
    description: "Back button to link back to a specified page.",
  },
  fields: [
    {
      type: "string",
      name: "link",
      label: "Link",
      description: "Enter the page path like ( /events or /about).",
      required: true,
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
  canvaEmbedBlock,
  backButtonBlock,
];

const footerContactBlock: Template = {
  name: "footer_contact",
  label: "Footer Contact Info",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: (item.header as string) || "Contact Section",
    }),
  },
  fields: [
    createRequiredStringField("Header", "header"),
    {
      type: "object",
      name: "contact_items",
      label: "Contact Items",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({
          label: (item.label as string) || "New Contact Item",
        }),
      },
      fields: [
        createRequiredStringField(
          "Label",
          "label",
          "Contact Label (email) (phone#)"
        ),
        createRequiredStringField("Value", "value", "Put the contact here."),
        {
          type: "string",
          name: "item_type",
          label: "Type",
          description: "Controls how the link is made choose text if etc",
          options: ["Text", "Email", "Phone"],
          required: true,
        },
      ],
    },
  ],
};

const footerLinksBlock: Template = {
  name: "footer_links",
  label: "Footer Link List",
  ui: {
    itemProps: (item: ItemProps) => ({
      label: (item.header as string) || "Link List",
    }),
    description: "Creates a column of links in the footer",
  },
  fields: [
    createRequiredStringField(
      "Header",
      "header",
      "Title for the list like our friends or resources."
    ),
    {
      type: "object",
      name: "links",
      label: "Links",
      description: "You can add or reorder the list.",
      list: true,
      ui: {
        itemProps: (item: ItemProps) => ({
          label: (item.text as string) || "New Link",
        }),
      },
      fields: [
        createRequiredStringField(
          "Link Text",
          "text",
          "Text that will be displayed for the link."
        ),
        createRequiredStringField("Link URL", "url", "Actual URL"),
      ],
    },
  ],
};

const footerRichTextBlock: Template = {
  name: "footer_text",
  label: "Footer Rich Text",
  fields: [
    {
      type: "rich-text",
      name: "body",
      label: "Content",
      templates: richTextTemplates,
    },
  ],
};

const seoField = {
  type: "object" as const,
  name: "seo",
  label: "SEO Settings",
  fields: [
    {
      type: "string" as const,
      name: "title",
      label: "SEO Title",
      description: "Overrides the page title for SEO.",
    },
    {
      type: "string" as const,
      name: "description",
      label: "SEO Description",
      description: "Description for seach engine results.",
      ui: { component: "textarea" as const },
    },
  ],
};

const schema = defineSchema({
  collections: [
    {
      label: "Site Settings",
      name: "global",
      path: "content/global",
      format: "mdx",
      ui: {
        global: true,
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
            {
              type: "object",
              name: "blocks",
              label: "Footer Content Blocks",
              list: true,
              templates: [
                footerContactBlock,
                footerLinksBlock,
                footerRichTextBlock,
              ],
            },
          ],
        },
        {
          type: "object",
          name: "socials",
          label: "Social Links",
          list: true,
          ui: {
            itemProps: (item: ItemProps) => ({
              label: item.platform || "New Social Link",
            }),
          },
          fields: [
            createRequiredStringField(
              "Platform",
              "platform",
              "(Instagram) (Facebook) etc"
            ),
            createRequiredStringField(
              "Icon",
              "icon",
              "Find icon names from materialUI library."
            ),
            createRequiredStringField("URL", "url"),
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
        seoField,
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
            const datePart = !isNaN(date.getTime())
              ? format(date, "yyyy-MM-dd")
              : format(new Date(), "yyyy-MM-dd");

            const titlePart = slugify(values.title || "new-event", {
              lower: true,
              strict: true,
            });

            return `${datePart}-${titlePart}`;
          },
        },
        itemProps: (item: { is_archived?: boolean; title?: string }) => ({
          label: `${item.is_archived ? "[Archived] " : ""}${
            item.title || "New Event"
          }`,
        }),
      },
      defaultItem: () => ({
        title: "New Event",
        date: new Date().toISOString(),
        type: "Swap",
        address: "TBD",
        layout_blocks: [
          { label: "Details" },
          { label: "Image" },
          { label: "Directions" },
          { label: "Map Embed" },
        ],
        showInstagramButton: false,
        showSignUpButton: false,
        is_archived: false,
        signUpButtonText: "Sign Up",
        directionsHeader: "Get Directions",
        instagramButtonText: "View on Insta",
      }),
      fields: [
        {
          ...createRequiredStringField("Event Title", "title"),
          isTitle: true,
        },
        seoField,
        { type: "string", name: "type", label: "Event Type" },
        {
          type: "datetime",
          name: "date",
          label: "Date & Time",
          required: true,
          description: "(Required)",
          ui: { timeFormat: "HH:mm" },
        },
        {
          type: "rich-text",
          name: "description",
          label: "Event Description",
          templates: richTextTemplates,
        },
        createImageField(),
        {
          type: "object",
          name: "banner_image",
          label: "Homepage Banner Image",
          description:
            "Landscape image for homepage event spotlight. Main event image will be used if empty.",
          fields: [
            {
              type: "string",
              name: "src",
              label: "Image File",
              ui: {
                component: "image" as const,
              },
            },
            {
              type: "string",
              name: "alt",
              label: "Alternative Text",
              description: "For screen readers",
            },
          ],
        },
        {
          type: "string",
          name: "address",
          label: "Event Address",
          description:
            "Paste the full address here once you do wait 1 second and the other maps field should be auto filled (in theory)",
          required: true,
          ui: {
            component: AddressFieldWithGenerator,
          },
        },
        {
          type: "string",
          name: "directionsHeader",
          label: "Directions Header Text",
          description: "Default: Get Directions",
        },
        { type: "string", name: "googleMapsLink", label: "Google Maps Link" },
        { type: "string", name: "appleMapsLink", label: "Apple Maps Link" },
        {
          type: "string",
          name: "embedMapSrc",
          label: "Google Maps Embed Code",
          ui: { component: "textarea" },
        },
        { type: "string", name: "instagramLink", label: "Instagram Link" },
        {
          type: "boolean",
          name: "showInstagramButton",
          label: "Show the Instagram Button?",
        },
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
        {
          type: "string",
          name: "signUpButtonText",
          label: "Sign Up Button Text",
          description: "Default: Sign Up",
        },
        { type: "string", name: "signUpLink", label: "Sign-Up Form URL" },
        {
          type: "boolean",
          name: "is_archived",
          label: "Archive Event",
          description: "Archived events will not appear on the live site.",
          ui: {
            component: "toggle",
          },
        },
        {
          type: "object",
          label: "Page Layout",
          name: "layout_blocks",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.label || "New Block",
            }),
          },
          fields: [
            {
              type: "string",
              name: "label",
              label: "Component",
              options: ["Details", "Image", "Directions", "Map Embed"],
            },
          ],
        },
        {
          type: "object",
          label: "Additional Content Blocks",
          name: "additional_blocks",
          list: true,
          description: "Add more content here.",
          templates: allPageBlockTemplates,
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
  media: {
    loadCustomStore: async () => {
      const { S3MediaStore } = await import("./s3-media-store");
      return S3MediaStore;
    },
  },
  schema,
});
