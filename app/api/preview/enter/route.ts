import { isUserAuthorized } from "@tinacms/auth";
import { redirect } from "next/navigation";
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const token = searchParams.get("token");

  if (process.env.NODE_ENV === "development") {
    draftMode().enable();
    return redirect(slug || "/");
  }

  if (!token) {
    return new Response("Missing token", { status: 401 });
  }

  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${token}`,
    clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  });

  if (isAuthorizedRes) {
    draftMode().enable();
    return redirect(slug || "/");
  }

  return new Response("Invalid token", { status: 401 });
}
