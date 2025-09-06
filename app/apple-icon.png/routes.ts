import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const iconUrl = new URL("/apple-icon.png", request.nextUrl.origin);

    const response = await fetch(iconUrl);

    if (!response.ok) {
      return new NextResponse("Apple icon not found!", { status: 404 });
    }

    const imageBlob = await response.blob();

    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error in getting apple-icon.png:", error);
    return new NextResponse("Internal server error in cloudflare runtime", {
      status: 500,
    });
  }
}
