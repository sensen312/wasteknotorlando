import { redirect } from "next/navigation";
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  draftMode().disable();
  return redirect(slug || "/");
}
