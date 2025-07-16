import { createMediaHandler } from "next-tinacms-s3/dist/handlers";
import { isAuthorized } from "@tinacms/auth";
import { NextApiRequest } from "next";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const handler = createMediaHandler({
  config: {
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
    region: process.env.NEXT_PUBLIC_S3_REGION,
  },
  bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
  authorized: async (req: NextApiRequest): Promise<boolean> => {
    if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
      return true;
    }
    try {
      const user = await isAuthorized(req);
      return !!(user && user.verified);
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

export const POST = handler;
export const GET = handler;
export const DELETE = handler;
