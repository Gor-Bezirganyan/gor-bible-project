import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeedEpisodeBySlug } from "../../../lib/rss";
import { AiCompanionBubble } from "../../../app/components/ai-companion-bubble";
import { generateEpisodeOutline, generateReflectionQuestions, generateEpisodePassages } from "../../../lib/generate-episode-content";

export const dynamic = "force-dynamic";

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = await getFeedEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  // Generate outline, passages and reflection questions in parallel if the episode doesn't have them
  const [outline, passages, reflectionQuestions] = await Promise.all([
    episode.outline?.length ? Promise.resolve(episode.outline) : generateEpisodeOutline(episode.title, episode.summary),
    episode.passages?.length ? Promise.resolve(episode.passages) : generateEpisodePassages(episode.title, episode.summary),
    episode.reflectionQuestions?.length ? Promise.resolve(episode.reflectionQuestions) : generateReflectionQuestions(episode.title, episode.summary),
  ]);

  return (
    <>
      <main className="space-y-8">
      <section className="space-y-8">
        {/* Video/Audio Player — now at the top */}
        <div className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90">
          <div className="flex flex-col gap-3 p-4">
            {/* YouTube Player */}
            {episode.youtubeId && (
              <div className="relative w-full" style={{paddingTop: '70%'}}>
                <iframe
                  className="absolute inset-0 h-full w-full rounded-2xl"
                  src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Spotify/Anchor Embed Player */}
            {episode.link && episode.link.includes("podcasters.spotify.com") ? (
              <div className="w-full overflow-hidden rounded-2xl border border-[#2A2438] bg-[#0B0A0F]/80 p-1">
                <iframe
                  src={episode.link.replace("/episodes/", "/embed/episodes/")}
                  height="102px"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  className="rounded-xl"
                ></iframe>
              </div>
            ) : episode.audioUrl ? (
              <div className="flex w-full items-center justify-center rounded-2xl border border-[#2A2438] bg-[#0B0A0F]/80 p-4">
                <audio controls className="w-full" src={episode.audioUrl}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : null}
          </div>

          {/* Title + description — now below the player */}
          <div className="border-t border-[#2A2438] px-6 py-8 mt-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#A855F7]">Episode hub</p>
            <h1 className="mt-2 font-serif text-2xl text-[#F5F3F7]">{episode.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#A1A1AA] line-clamp-4">
              {episode.summary.replace(/<[^>]*>?/gm, '')}
            </p>
          </div>
        </div>

        {/* Outline + Passages */}
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
            <h2 className="text-xl font-semibold text-[#F5F3F7]">Outline</h2>
            <ol className="mt-4 space-y-3 text-sm text-[#A1A1AA]">
              {outline.length > 0 ? outline.map((item) => (
                <li key={item} className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3">
                  {item}
                </li>
              )) : (
                <li className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3 text-[#A1A1AA]/50 italic">Outline could not be generated.</li>
              )}
            </ol>
          </article>

          <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
            <h2 className="text-xl font-semibold text-[#F5F3F7]">Passages</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {passages.length > 0 ? passages.map((passage) => (
                <Link key={passage} href={`/studies/${passage.toLowerCase().replace(/\s+/g, "-")}/1`} className="rounded-full border border-[#2A2438] px-3 py-1 text-xs text-[#F5F3F7] transition hover:border-[#7C3AED]">
                  {passage}
                </Link>
              )) : (
                <p className="text-sm text-[#A1A1AA]/50 italic">No passages identified.</p>
              )}
            </div>
          </article>
        </section>

        {/* Reflection Questions */}
        <section className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">Reflection questions</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#A1A1AA]">
            {reflectionQuestions.length > 0 ? reflectionQuestions.map((question) => (
              <li key={question} className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3">
                {question}
              </li>
            )) : (
              <li className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3 text-[#A1A1AA]/50 italic">Questions could not be generated.</li>
            )}
          </ul>
        </section>
      </section>
    </main>

      <AiCompanionBubble
        title={episode.title}
        summary={episode.summary}
        outline={episode.outline}
        passages={episode.passages}
      />
    </>
  );
}
