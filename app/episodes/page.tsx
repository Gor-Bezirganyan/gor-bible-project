import Link from "next/link";
import { getFeedEpisodes } from "../../lib/rss";

export default async function EpisodesPage() {
  const episodes = await getFeedEpisodes();

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

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <Link
            key={episode.slug}
            href={`/episodes/${episode.slug}`}
            className="group flex flex-col overflow-hidden rounded-[24px] border border-[#2A2438] bg-[#0B0A0F]/70 transition-all hover:-translate-y-1 hover:border-[#7C3AED]/50 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)]"
          >
            {/* Image Section */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#161320]">
              {episode.image ? (
                <img 
                  src={episode.image} 
                  alt={episode.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2A2438] to-[#0B0A0F]">
                  <span className="text-[#7C3AED] opacity-50">Episode</span>
                </div>
              )}
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#0B0A0F]/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-transform duration-300 group-hover:scale-100">
                  <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>

            {/* Content Section (Bottom) */}
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold tracking-wider text-[#A855F7] uppercase">{episode.date}</p>
              <h2 className="mt-2 font-serif text-xl font-medium leading-snug text-[#F5F3F7] line-clamp-2">
                {episode.title}
              </h2>
              {/* Truncated description */}
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA] line-clamp-3">
                {episode.summary.replace(/<[^>]*>?/gm, '')}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#A855F7] transition-colors group-hover:text-[#C084FC]">
                Go to episode <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
