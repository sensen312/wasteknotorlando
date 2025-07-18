import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isUserAuthorized } from "@tinacms/auth";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

if (!process.env.TINA_CLIENT_ID) {
  console.error(
    "FATAL: Tina client ID not configured to the Edge enviroment ;-;."
  );
}

export const runtime = "edge";
export const dynamic = "force-dynamic";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
});

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET as string;

async function checkAuth(req: NextRequest) {
  if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
    return { isAuthorized: true, error: null };
  }
  try {
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const user = await isUserAuthorized({
          token,
          clientID: process.env.TINA_CLIENT_ID as string,
        });
        if (user && user.verified) {
          return { isAuthorized: true, error: null };
        }
      }
    }

    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      const tokenFromCookie = cookies.tina_oauth_token;
      if (tokenFromCookie) {
        const user = await isUserAuthorized({
          token: tokenFromCookie,
          clientID: process.env.TINA_CLIENT_ID as string,
        });
        if (user && user.verified) {
          return { isAuthorized: true, error: null };
        }
      }
    }

    return {
      isAuthorized: false,
      error: "Auth token not found/ invalid ;-;",
    };
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return { isAuthorized: false, error: e.message };
    }
    return {
      isAuthorized: false,
      error: "An unknown error occurred during auth",
    };
  }
}

export async function GET(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get("prefix") || "";
    const nextContinuationToken =
      searchParams.get("nextContinuationToken") || undefined;

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Delimiter: "/",
      Prefix: prefix,
      ContinuationToken: nextContinuationToken,
    });

    const { Contents, NextContinuationToken, CommonPrefixes } =
      await s3Client.send(command);

    const directories =
      CommonPrefixes?.map((p) => ({
        type: "dir" as const,
        id: p.Prefix,
        filename: p.Prefix?.split("/").slice(-2, -1)[0],
        directory: p.Prefix?.split("/").slice(0, -2).join("/"),
      })) || [];

    const files =
      Contents?.filter((file) => file.Key !== prefix && file.Size).map(
        (file) => ({
          type: "file" as const,
          id: file.Key,
          filename: file.Key?.split("/").pop(),
          directory: file.Key?.substring(0, file.Key.lastIndexOf("/")),
          lastModified: file.LastModified?.getTime(),
          size: file.Size,
          src: `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file.Key}`,
        })
      ) || [];

    return NextResponse.json({
      items: [...directories, ...files],
      nextContinuationToken: NextContinuationToken,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json(
        { message: "Failed to list the media", error: e.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "error while listing media." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  try {
    const { fileType, directory, fileName } = await req.json();

    const buffer = new Uint8Array(4);
    crypto.getRandomValues(buffer);
    const randomStr = Array.from(buffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const key = `${directory ? directory + "/" : ""}${randomStr}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
      ACL: "public-read",
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });

    return NextResponse.json({
      uploadURL: presignedUrl,
      key: key,
      url: `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${key}`,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json(
        { message: "Failed creating presigned URL", error: e.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Unknown error while creating presigned URL.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  try {
    const { key } = await req.json();
    if (!key) {
      return NextResponse.json(
        { message: "File key missing" },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);

    return NextResponse.json({ message: "File deleted !" });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json(
        { message: "FAILED TO DELETE FILE!", error: e.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error while deleting file!." },
      { status: 500 }
    );
  }
}
