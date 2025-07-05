import { createClient } from "tinacms/dist/client";
import { queries } from "./__generated__/queries";

const client = createClient({
  queries,
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
});

export default client;
