import { MapProps } from "@/app/kart/page";
import { ArchiveProps } from "@/components/ui/archive/ArchiveItem";
import { ContactFooter, ContactPersons } from "@/interfaces/contact";
import Event from "@/interfaces/event";
import type { HomeProps } from "@/interfaces/home";
import News from "@/interfaces/news";
import { Tickets } from "@/interfaces/tickets";
import { sanityFetch } from "@/sanity/lib/live";
import { ARCHIVE_QUERY } from "@/sanity/queries/archive";
import { SINGLE_CONTACT_FOOTER_QUERY } from "@/sanity/queries/contactFooter";
import { CONTACT_PERSONS_QUERY } from "@/sanity/queries/contactPersons";
import { EVENT_QUERY } from "@/sanity/queries/event";
import {
  BACKGROUND_VIDEO_QUERY,
  SINGLE_HOME_QUERY,
} from "@/sanity/queries/home";
import { SINGLE_MAP_QUERY } from "@/sanity/queries/map";
import { ALL_NEWS_QUERY } from "@/sanity/queries/news";
import { TICKETS_QUERY } from "@/sanity/queries/tickets";
import { cache } from "react";

export const getEvents = cache(async (): Promise<Event[]> => {
  try {
    const { data } = await sanityFetch({ query: EVENT_QUERY });
    return data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
});

export const getHome = cache(async (): Promise<HomeProps | null> => {
  try {
    const { data } = await sanityFetch({ query: SINGLE_HOME_QUERY });
    return data || null;
  } catch (error) {
    console.error("Error fetching home:", error);
    return null;
  }
});

export const getNews = cache(async (): Promise<News[]> => {
  try {
    const { data } = await sanityFetch({ query: ALL_NEWS_QUERY });
    return data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
});

export const getContactFooterInfo = cache(async (): Promise<ContactFooter> => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_CONTACT_FOOTER_QUERY,
    });
    return (
      data || {
        email: "",
        address: "",
        postbox: "",
        socialLinks: [],
      }
    );
  } catch (error) {
    console.error("Error fetching contact footer:", error);
    return {
      email: "",
      address: "",
      postbox: "",
      socialLinks: [],
    };
  }
});

export const getContactPersons = cache(
  async (): Promise<ContactPersons[] | null> => {
    try {
      const { data } = await sanityFetch({ query: CONTACT_PERSONS_QUERY });
      return data || null;
    } catch (error) {
      console.error("Error fetching contact persons:", error);
      return null;
    }
  }
);

export const getTickets = cache(async (): Promise<Tickets | null> => {
  try {
    const { data } = await sanityFetch({ query: TICKETS_QUERY });
    return data || null;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return null;
  }
});

export const getMap = cache(async (): Promise<MapProps | null> => {
  try {
    const { data } = await sanityFetch({ query: SINGLE_MAP_QUERY });
    return data || null;
  } catch (error) {
    console.error("Error fetching map:", error);
    return null;
  }
});

export const getBackgroundVideo = createCachedSanityQuery<{
  asset: { url: string };
}>(BACKGROUND_VIDEO_QUERY);

export const getArchive = cache(async (): Promise<ArchiveProps | null> => {
  try {
    const { data } = await sanityFetch({ query: ARCHIVE_QUERY });
    return data || null;
  } catch (error) {
    console.error("Error fetching archive:", error);
    return null;
  }
});

export const getEventBySlug = cache(
  async (slug: string): Promise<Event | null> => {
    const events = await getEvents();
    return events.find((event: Event) => event.slug.current === slug) || null;
  }
);

export const getNewsBySlug = cache(
  async (slug: string): Promise<News | null> => {
    const news = await getNews();
    return news.find((item: News) => item.slug.current === slug) || null;
  }
);

export function createCachedSanityQuery<T>(query: string) {
  return cache(async (): Promise<T | null> => {
    try {
      const { data } = await sanityFetch({ query });
      return data || null;
    } catch (error) {
      console.error(`Error fetching query:`, error);
      return null;
    }
  });
}
