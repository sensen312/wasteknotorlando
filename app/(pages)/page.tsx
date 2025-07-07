import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "./[...slug]/PageClient";
import { Event } from "@/tina/__generated__/types";

export default async function HomePage() {
  try {
    const res = await client.queries.page({
      relativePath: "home.mdx",
    });
    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges?.map((edge) => edge.node) || [];

    return (
      <PageClient
        data={res.data}
        variables={res.variables}
        query={res.query}
        allEvents={allEvents as Event[]}
      />
    );
  } catch (error) {
    console.error("Failed to fetch homepage. ;-;", error);
    notFound();
  }
}
