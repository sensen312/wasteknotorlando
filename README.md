# Waste Knot Orlando - Official Site documentation

This is the official docs for the Waste Knot Orlando Site a nextjs app, which includes the tinacms docs, and also the cloudflare docs.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features & Architecture](#key-features--architecture)
  - [Content Management (TinaCMS)](#content-management-tinacms)
  - [S3 Media Store](#s3-media-store)
  - [Dynamic Block Renderer](#dynamic-block-renderer)
  - [Event System](#event-system)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [MUI (Material-UI)](https://mui.com/) 
- **Content Management:** [TinaCMS](https://tina.io/) (Git based CMS)
- **Media Storage:** [AWS S3](https://aws.amazon.com/s3/)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/)

## Project Structure

Here is the gist of how things are laid out so you don't get lost.

```bash
└── sensen312-wasteknotorlando/
    ├── README.md
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── tsconfig.json
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.module.css
    │   ├── robot.ts
    │   ├── sitemap.ts
    │   ├── (pages)/
    │   │   ├── page.tsx
    │   │   ├── [...slug]/
    │   │   │   ├── page.tsx
    │   │   │   └── PageClient.tsx
    │   │   └── events/
    │   │       ├── ListingPageClient.tsx
    │   │       ├── page.tsx
    │   │       └── [slug]/
    │   │           ├── EventPageClient.tsx
    │   │           └── page.tsx
    │   └── api/
    │       └── s3/
    │           └── media/
    │               └── route.ts
    ├── components/
    │   ├── blocks/
    │   │   ├── BlockRenderer.tsx
    │   │   ├── DonationBlock.tsx
    │   │   ├── EventLayoutRenderer.tsx
    │   │   ├── TopBannerBlock.tsx
    │   │   ├── content/
    │   │   ├── event/
    │   │   ├── sections/
    │   │   └── specifics/
    │   ├── global/
    │   │   ├── ClientWrappers.tsx
    │   │   ├── Footer.tsx
    │   │   └── Header.tsx
    │   └── sections/
    │       ├── EventsListing.tsx
    │       └── InteractiveCalendar.tsx
    ├── content/
    │   ├── events/
    │   ├── global/
    │   └── pages/
    ├── context/
    │   └── AccessibilityContext.tsx
    ├── public/
    │   ├── .nojekyll
    │   └── fonts/
    ├── theme/
    │   └── theme.ts
    └── tina/
        ├── client.ts
        ├── config.ts
        └── s3-media-store.ts
```

## Key Features & Architecture

### Content Management (TinaCMS)
We use TinaCMS because it commits content directly to Git. This means every change is a commit.
- **Config:** defined in `tina/config.ts`. If you need a new field, go there.
- **Auth:** We check `isUserAuthorized` in our API routes to make sure random people aren't editing stuff ;-;

### S3 Media Store
The default Tina S3 plugin **does not work** with Cloudflare Pages (Edge Runtime). It crashes the build.
- We wrote a custom `S3MediaStore` class in `tina/s3-media-store.ts`.
- It talks to our own API route at `app/api/s3/media/route.ts`.
- This handles uploading images to AWS S3 and giving us back the URL.

### Dynamic Block Renderer
We don't hardcode pages. We use a "Blocks" system. So that user can make their own page layouts
- `app/(pages)/[...slug]/page.tsx` fetches the data.
- `components/blocks/BlockRenderer.tsx` iterates through the list of blocks and renders the right component.
- If you add a new block in Tina, you **MUST** add it to the switch statement in the renderer or it won't show up.

### Event System
Events are their own collection.
- They have specific fields for date, map embeds, and archiving.
- The `InteractiveCalendar` component filters these events automatically based on the date field.
- **Archiving:** You can toggle `is_archived` in the CMS to hide an event without deleting the file.

## Getting Started

1.  **Clone the repo:**
    ```bash
    git clone <repo-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    You need a `.env` file with these keys. If you don't have them, ask the team.
    ```env
    NEXT_PUBLIC_TINA_CLIENT_ID=
    TINA_TOKEN=
    NEXT_PUBLIC_TINA_BRANCH=main
    NEXT_PUBLIC_S3_REGION=
    NEXT_PUBLIC_S3_BUCKET=
    S3_ACCESS_KEY=
    S3_SECRET_KEY=
    ```

4.  **Run it locally:**
    This starts the Next.js server AND the TinaCMS local server.
    ```bash
    npm run dev
    ```
    Go to `http://localhost:3000/admin` to edit content.

## Deployment

We host on **Cloudflare Pages**.

- **Build Command:** `npm run build` (which runs `tinacms build && next build`)
- **Output Directory:** `.next`
- **Compatibility Flag:** `nodejs_compat` (make sure this is set in Cloudflare settings!)

If the build fails, check the environment variables in Cloudflare dashboard first ;-;