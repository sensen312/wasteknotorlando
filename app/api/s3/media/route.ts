import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isUserAuthorized } from "@tinacms/auth";
import { NextRequest, NextResponse } from "next/server";

// we need edge runtime for cloudflare pages compatibility
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

// helper to make sure only real users touch our bucket
async function checkAuth(req: NextRequest) {
  // locally we dont care, just let it pass
  if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
    return { isAuthorized: true, error: null };
  }
  try {
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");
    if (!clientId) {
      return {
        isAuthorized: false,
        error: "Client ID is missing from request ;-; BRUH ",
      };
    }

    const authHeader = req.headers.get("X-Tina-Authorization");
    if (authHeader) {
      const token = authHeader;

      // verify the token against tina cloud
      const user = await isUserAuthorized({
        token,
        clientID: clientId,
      });

      if (user && user.verified) {
        return { isAuthorized: true, error: null };
      } else {
        return {
          isAuthorized: false,
          error:
            "Token from custom header was found but failed  validation ;-;",
        };
      }
    }

    return {
      isAuthorized: false,
      error: "Auth token not found in custom header ;-;",
    };
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return {
        isAuthorized: false,
        error: `Auth check error: ${e.message}`,
      };
    }
    return {
      isAuthorized: false,
      error: "An unknown error occurred during auth",
    };
  }
}

// lists the files in the bucket for the cms media manager
export async function GET(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    let prefix = searchParams.get("prefix") || "";
    const nextContinuationToken =
      searchParams.get("nextContinuationToken") || undefined;

    if (prefix && !prefix.endsWith("/")) {
      prefix += "/";
    }

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Delimiter: "/",
      Prefix: prefix,
      ContinuationToken: nextContinuationToken,
    });

    const { Contents, NextContinuationToken, CommonPrefixes } =
      await s3Client.send(command);

    // format folders for tina
    const directories =
      CommonPrefixes?.map((p) => ({
        type: "dir" as const,
        id: p.Prefix,
        filename: p.Prefix?.split("/").slice(-2, -1)[0],
        directory: p.Prefix?.split("/").slice(0, -2).join("/"),
      })) || [];

    // format files for tina
    const files =
      Contents?.filter((file) => file.Key !== prefix && file.Size).map(
        (file) => {
          const src = `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file.Key}`;
          return {
            type: "file" as const,
            id: file.Key,
            filename: file.Key?.split("/").pop(),
            directory: file.Key?.substring(0, file.Key.lastIndexOf("/")),
            lastModified: file.LastModified?.getTime(),
            size: file.Size,
            src: src,
            // we dont actually have thumbnails but tina asks for them
            thumbnails: {
              "75x75": src,
              "400x400": src,
              "1000x1000": src,
            },
          };
        }
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

// generates a presigned url so the client can upload directly to s3
export async function POST(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  try {
    const { fileType, directory, fileName } = await req.json();

    // random hash to prevent filename collisions
    const buffer = new Uint8Array(4);
    crypto.getRandomValues(buffer);
    const randomStr = Array.from(buffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const cleanedDirectory = directory.replace(/^\/+|\/+$/g, "");

    const key = `${
      cleanedDirectory ? cleanedDirectory + "/" : ""
    }${randomStr}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
      ACL: "public-read",
    });

    // presigned url expires in 5 minutes
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

// handles deleting files or entire folders
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

    // if it ends in slash its a folder, we gotta delete all contents first
    if (key.endsWith("/")) {
      const listCommand = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: key,
      });
      const listedObjects = await s3Client.send(listCommand);

      if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
        return NextResponse.json({ message: "Empty folder deleted!" });
      }

      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
        },
      };

      const deleteCommand = new DeleteObjectsCommand(deleteParams);
      await s3Client.send(deleteCommand);

      return NextResponse.json({ message: "Folder and its contents deleted!" });
    } else {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      await s3Client.send(command);

      return NextResponse.json({ message: "File deleted !" });
    }
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
