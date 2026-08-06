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
      const content = String(item.itunesSummary ?? item.contentSnippet ?? item.content ?? "");
      
      // Look for a YouTube link in the description
      const youtubeMatch = content.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      const youtubeId = youtubeMatch ? youtubeMatch[1] : null;

      return {
        slug: slugify(String(slugSource)),
        title,
        date: formatPubDate(item.pubDate ?? item.isoDate),
        summary:
          content.trim() ||
          "Listen to this episode for the full conversation.",
        videoLabel: item.episode ? `Episode ${item.episode}` : "Podcast episode",
        passages: [],
        outline: [],
        reflectionQuestions: [],
        audioUrl: item.enclosure?.url ?? item.link ?? "",
        link: item.link ?? "",
        image: (typeof item.itunesImage === 'object' && item.itunesImage?.$?.href) 
               ? item.itunesImage.$.href 
               : (typeof item.itunesImage === 'string' ? item.itunesImage : (feed.image?.url ?? "")),
        youtubeId,
      } as Episode & { audioUrl: string; link: string; image?: string; youtubeId?: string | null };
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
