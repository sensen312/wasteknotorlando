import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isAuthorized } from "@tinacms/auth";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET!;

async function checkAuth(req: NextRequest) {
  if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
    return { isAuthorized: true };
  }
  try {
    const user = await isAuthorized(req);
    if (user && user.verified) {
      return { isAuthorized: true };
    }
    return { isAuthorized: false, error: "User not authorized" };
  } catch (e: unknown) {
    console.error(e);
    return {
      isAuthorized: false,
      error: e instanceof Error ? e.message : "unknown error",
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
    const prefix = searchParams.get("prefix") || undefined;
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
    console.error(e);
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      { message: "Failed to list media", error: message },
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
    const { directory, fileName, fileType } = await req.json();
    const randomStr = randomBytes(4).toString("hex");
    const key = `${directory ? `${directory}/` : ""}${randomStr}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
      ACL: "public-read",
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });

    const publicUrl = `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      uploadURL: presignedUrl,
      key: key,
      url: publicUrl,
    });
  } catch (e: unknown) {
    console.error(e);
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      { message: "Failed creating presigned URL", error: message },
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

    return NextResponse.json({ message: "File deleted!!!!" });
  } catch (e: unknown) {
    console.error(e);
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      { message: "Failed to delete file ;-;", error: message },
      { status: 500 }
    );
  }
}
