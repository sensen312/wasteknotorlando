import React from "react";
import EventDisplay from "./EventDisplay";

interface Event {
  id: number;
  slug: string;
  type: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  address: string;
  instagramLink: string;
  googleMapsLink: string;
  appleMapsLink: string;
  embedMapSrc?: string;
}

// Source from Tina Later
const eventsData: Event[] = [
  {
    id: 1,
    slug: "event-one-slug",
    type: "Workshop",
    title: "Recycled Horrors Art Workshop",
    date: "8/18/25",
    time: "7:00 PM - 9:00 PM",
    description:
      "Make your own upcycled piece of art! Bryan (aka Recycled Horrors Art) and Sarah (Waste Knot Orlando) will be leading a workshop about making your own upcycled art.Provided supplies: Canvas, glue, recycled materials (you can also bring some of your own) Suggested donation: $10-$40 (sliding scale) TUA members can attend for free.",
    image: "/wasteknotorlando/asset/RecycledHorrorsArtWorkShop.jpg",
    address: "310 E New Hampshire St #700, Orlando, FL 32804, USA",
    instagramLink: "https://www.instagram.com/WasteKnotOrlando",
    googleMapsLink:
      "https://www.google.com/maps/place/28%C2%B034'03.1%22N+81%C2%B022'25.4%22W/@28.5675188,-81.3762927,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.5675188!4d-81.3737178?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D",
    appleMapsLink:
      "https://maps.apple.com/directions?destination=310+E+New+Hampshire+St%2C+310+E+New+Hampshire+St+Orlando%2C+FL++32804+United+States&mode=driving",
    embedMapSrc:
      "https://maps.google.com/maps?q=310%20E%20New%20Hampshire%20St%20%23700%2C%20Orlando%2C%20FL%2032804%2C%20USA&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 2,
    slug: "event-two-slug",
    type: "EVENT TYPE HERE",
    title: "TITLE HERE",
    date: "DATE HERE",
    time: "TIME HERE",
    description:
      "BLAH BLAHBLAH BLAH MEOW BLAHBLAH BLAHBLAH BLAH BLAH BLAH BLAH BLAHBLAH BLAH MEOW BLAHBLAH BLAHBLAH BLAH BLAH BLAH",
    image: "https://placehold.co/800x800/005B39/FFFFFF?text=EVENT+IMAGE",
    address: "EVENT ADDRESS ",
    instagramLink: "https://www.instagram.com/WasteKnotOrlando",
    googleMapsLink: "#",
    appleMapsLink: "#",
    embedMapSrc: "#",
  },
  {
    id: 3,
    slug: "event-three-slug",
    type: "EVENT TYPE HERE",
    title: "TITLE HERE",
    date: "DATE HERE",
    time: "TIME HERE",
    description:
      "BLAH BLAHBLAH BLAH MEOW BLAHBLAH BLAHBLAH BLAH BLAH BLAH BLAH BLAHBLAH BLAH MEOW BLAHBLAH BLAHBLAH BLAH BLAH BLAH",
    image: "https://placehold.co/800x800/005B39/FFFFFF?text=EVENT+IMAGE",
    address: "EVENT ADDRESS",
    instagramLink: "https://www.instagram.com/WasteKnotOrlando",
    googleMapsLink: "#",
    appleMapsLink: "#",
    embedMapSrc: "#",
  },
];

// Change with Tina later
export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

// Basically simulates server
async function getEventData(params: {
  slug: string;
}): Promise<Event | undefined> {
  const event = eventsData.find((e) => e.slug === params.slug);
  return Promise.resolve(event);
}

export default async function IndividualEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const eventData = await getEventData(params);

  return <EventDisplay eventData={eventData} />;
}
