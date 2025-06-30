import React from "react";
import EventDisplay from "./EventDisplay";
import type { NextPage } from "next";

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
    image: "/assets/RecycledHorrorsArtWorkShop.jpg",
    address: "310 E New Hampshire St #700, Orlando, FL 32804, USA",
    instagramLink: "https://www.instagram.com/WasteKnotOrlando",
    googleMapsLink:
      "https://maps.google.com/?q=310+E+New+Hampshire+St+%23700,+Orlando,+FL+32804",
    appleMapsLink:
      "https://maps.apple.com/?address=310%20E%20New%20Hampshire%20St,%20Unit%20700,%20Orlando,%20FL%20%2032804,%20United%20States",
    embedMapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.921306323131!2d-81.369873!3d28.572093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77b062b1a5a9d%3A0x6b41e6a14e41d3!2s310%20E%20New%20Hampshire%20St%20%23700%2C%20Orlando%2C%20FL%2032804%2C%20USA!5e0!3m2!1sen!2s!4v1627883391238!5m2!1sen!2s",
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

const IndividualEventPage: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const eventData = await getEventData(params);
  return <EventDisplay eventData={eventData} />;
};

export default IndividualEventPage;
