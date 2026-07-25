import Link from "next/link";
import { episodes } from "../data/site-content";

export default function EpisodesPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A855F7]">Episodes</p>
        <h1 className="mt-3 font-serif text-3xl text-[#F5F3F7] sm:text-4xl">
          The episode library for study, reflection, and deeper listening.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#A1A1AA]">
          Each episode is linked back to the Scripture it covers so the full journey feels connected.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {episodes.map((episode) => (
          <article key={episode.slug} className="rounded-[22px] border border-[#2A2438] bg-[#0B0A0F]/70 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-[#A855F7]">{episode.date}</p>
              <span className="rounded-full border border-[#2A2438] px-3 py-1 text-xs text-[#A1A1AA]">
                {episode.videoLabel}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-2xl text-[#F5F3F7]">{episode.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{episode.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {episode.passages.map((passage) => (
                <span key={passage} className="rounded-full border border-[#2A2438] px-3 py-1 text-xs text-[#F5F3F7]">
                  {passage}
                </span>
              ))}
            </div>
            <Link
              href={`/episodes/${episode.slug}`}
              className="mt-6 inline-flex rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#A855F7]"
            >
              Open episode hub
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
