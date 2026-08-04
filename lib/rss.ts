import Parser from "rss-parser";
import { Episode, episodes as fallbackEpisodes } from "../app/data/site-content";

const parser = new Parser({
  customFields: {
    item: [
      ["itunes:episode", "episode"],
      ["itunes:summary", "itunesSummary"],
      ["itunes:image", "itunesImage"],
      ["itunes:duration", "episodeDuration"],
    ],
  },
});

const feedUrl = process.env.RSS_FEED_URL?.trim();

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function formatPubDate(pubDate?: string) {
  if (!pubDate) return "Unknown date";
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return pubDate;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export async function getFeedEpisodes() {
  if (!feedUrl) {
    return fallbackEpisodes;
  }

  try {
    const response = await fetch(feedUrl, { next: { revalidate: 300 } });
    if (!response.ok) {
      console.warn("RSS feed fetch failed with status", response.status);
      return fallbackEpisodes;
    }

    const xml = await response.text();
    const feed = await parser.parseString(xml);

    if (!feed.items?.length) {
      return fallbackEpisodes;
    }

    return feed.items.map((item) => {
      const title = item.title ?? "Untitled episode";
      const slugSource = item.guid ?? item.link ?? title;
      return {
        slug: slugify(String(slugSource)),
        title,
        date: formatPubDate(item.pubDate ?? item.isoDate),
        summary:
          String(item.itunesSummary ?? item.contentSnippet ?? item.content ?? "").trim() ||
          "Listen to this episode for the full conversation.",
        videoLabel: item.episode ? `Episode ${item.episode}` : "Podcast episode",
        passages: [],
        outline: [],
        reflectionQuestions: [],
        audioUrl: item.enclosure?.url ?? item.link ?? "",
        link: item.link ?? "",
        image: item.itunesImage ?? (feed.image?.url ?? ""),
      } as Episode & { audioUrl: string; link: string; image?: string };
    });
  } catch (error) {
    console.warn("RSS feed parse failed", error);
    return fallbackEpisodes;
  }
}

export async function getFeedEpisodeBySlug(slug: string) {
  const episodes = await getFeedEpisodes();
  return episodes.find((episode) => episode.slug === slug) || null;
}
