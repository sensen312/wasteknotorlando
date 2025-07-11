import client from "@/tina/client";
import { notFound } from "next/navigation";
import { PageClient } from "./[...slug]/PageClient";
import { Event } from "@/tina/__generated__/types";

export default async function HomePage() {
  try {
    const homePageResult = await client.queries.page({
      relativePath: "home.mdx",
    });

    const eventsResult = await client.queries.eventConnection();
    const allEvents =
      eventsResult.data.eventConnection.edges
        ?.map((edge) => edge?.node)
        .filter((event): event is Event => !!event) || [];

    return (
      <PageClient
        data={homePageResult.data}
        variables={homePageResult.variables}
        query={homePageResult.query}
        allEvents={allEvents}
      />
    );
  } catch (error) {
    console.error("Failed to fetch homepage at build ;-;", error);
    notFound();
  }
}
