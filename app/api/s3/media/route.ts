import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isAuthorized } from "@tinacms/auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
});

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET as string;

async function checkAuth(req: NextRequest) {
  if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
    return { isAuthorized: true };
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await isAuthorized(req as any);
    if (user && user.verified) {
      return { isAuthorized: true };
    }
    return { isAuthorized: false, error: "User isnt not authorized" };
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
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
    return NextResponse.json(
      { message: auth.error || "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get("prefix") || "";
    const nextContinuationToken =
      searchParams.get("nextContinuationToken") || undefined;

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      ContinuationToken: nextContinuationToken,
    });

    const { Contents, NextContinuationToken } = await s3Client.send(command);

    const files =
      Contents?.map((file) => ({
        type: "file",
        id: file.Key,
        filename: file.Key?.split("/").pop(),
        directory: file.Key?.substring(0, file.Key.lastIndexOf("/")),
        lastModified: file.LastModified?.getTime(),
        size: file.Size,
        src: `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file.Key}`,
      })) || [];

    return NextResponse.json({
      items: files,
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
    return NextResponse.json(
      { message: auth.error || "Unauthorized" },
      { status: 401 }
    );
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
        { message: "Failed tcreating presigned URL", error: e.message },
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
    return NextResponse.json(
      { message: auth.error || "Unauthorized" },
      { status: 401 }
    );
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
