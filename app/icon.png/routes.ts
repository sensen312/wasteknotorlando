import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const iconUrl = new URL("/icon.png", request.nextUrl.origin);

    const response = await fetch(iconUrl);

    if (!response.ok) {
      return new NextResponse("Icon not found ;-;", { status: 404 });
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
    console.error("Error in getting icon.png:", error);
    return new NextResponse("Internal server error ;-;", { status: 500 });
  }
}
