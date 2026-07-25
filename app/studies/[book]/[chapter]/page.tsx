import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudyByPath } from "../../../data/site-content";

export function generateStaticParams() {
  return [
    { book: "romans", chapter: "8" },
    { book: "psalms", chapter: "23" },
  ];
}

export default async function StudyDetailPage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book, chapter } = await params;
  const study = getStudyByPath(book, chapter);

  if (!study) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <section className="rounded-[24px] border border-[#2A2438] bg-[linear-gradient(135deg,_rgba(124,58,237,0.16),_rgba(22,19,32,0.96))] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A855F7]">Study page</p>
        <h1 className="mt-3 font-serif text-3xl text-[#F5F3F7]">{study.title}</h1>
        <p className="mt-4 text-lg text-[#A1A1AA]">{study.summary}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">Bible text</h2>
          <div className="mt-4 rounded-2xl border border-[#2A2438] bg-[#0B0A0F]/70 p-5 text-sm leading-8 text-[#F5F3F7]">
            <p>“{study.title}” is a placeholder study page for the chapter text and commentary.</p>
            <p className="mt-3 text-[#A1A1AA]">
              In the finished version, this column will render the selected translation with chapter-by-chapter navigation and verse links.
            </p>
          </div>
        </article>

        <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">AI tabs</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A855F7]">Summary</h3>
              <p className="mt-2 text-sm text-[#A1A1AA]">{study.summary}</p>
            </div>
            <div className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A855F7]">Reflection</h3>
              <ul className="mt-2 space-y-2 text-sm text-[#A1A1AA]">
                {study.reflection.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A855F7]">Related episodes</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {study.relatedEpisodes.map((episodeSlug) => (
                  <Link key={episodeSlug} href={`/episodes/${episodeSlug}`} className="rounded-full border border-[#2A2438] px-3 py-1 text-xs text-[#F5F3F7]">
                    {episodeSlug.replace("-", " ")}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
        <h2 className="text-xl font-semibold text-[#F5F3F7]">Prayer prompt</h2>
        <p className="mt-3 text-lg text-[#A1A1AA]">{study.prayerPrompt}</p>
      </section>
    </main>
  );
}
