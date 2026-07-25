import Link from "next/link";
import { studies } from "../data/site-content";

export default function StudiesPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A855F7]">Scripture hub</p>
        <h1 className="mt-3 font-serif text-3xl text-[#F5F3F7] sm:text-4xl">
          Browse Scripture by book, chapter, and theme.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#A1A1AA]">
          Every chapter page is designed to connect the Bible text to reflection, AI summaries, and related episodes.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {studies.map((study) => (
          <article key={`${study.book}-${study.chapter}`} className="rounded-[22px] border border-[#2A2438] bg-[#0B0A0F]/70 p-6">
            <p className="text-sm text-[#A855F7]">{study.translation}</p>
            <h2 className="mt-2 font-serif text-2xl text-[#F5F3F7]">{study.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{study.summary}</p>
            <Link
              href={`/studies/${study.book}/${study.chapter}`}
              className="mt-6 inline-flex rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#A855F7]"
            >
              Open chapter page
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
