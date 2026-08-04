import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeedEpisodeBySlug } from "../../../lib/rss";
import { AiCompanionBubble } from "../../../app/components/ai-companion-bubble";

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

  return (
    <>
      <main className="space-y-8">
      <section className="rounded-[24px] border border-[#2A2438] bg-[linear-gradient(135deg,_rgba(124,58,237,0.18),_rgba(22,19,32,0.96))] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A855F7]">Episode hub</p>
        <h1 className="mt-3 font-serif text-3xl text-[#F5F3F7]">{episode.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-[#A1A1AA]">{episode.summary}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">Video + audio</h2>
          <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl border border-[#2A2438] bg-[#0B0A0F]/80">
            <p className="text-sm text-[#A1A1AA]">YouTube embed placeholder for {episode.videoLabel}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {episode.passages.map((passage) => (
              <Link key={passage} href={`/studies/${passage.toLowerCase().replace(/\s+/g, "-")}/1`} className="rounded-full border border-[#2A2438] px-3 py-1 text-xs text-[#F5F3F7]">
                {passage}
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">Outline</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#A1A1AA]">
            {episode.outline.map((item) => (
              <li key={item} className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3">
                {item}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
        <h2 className="text-xl font-semibold text-[#F5F3F7]">Reflection questions</h2>
        <ul className="mt-4 space-y-3 text-sm text-[#A1A1AA]">
          {episode.reflectionQuestions.map((question) => (
            <li key={question} className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3">
              {question}
            </li>
          ))}
        </ul>
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
