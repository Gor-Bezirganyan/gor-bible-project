import Link from "next/link";

const quickLinks = [
  { title: "Latest episodes", description: "Start with the newest teaching and reflection content.", href: "/episodes" },
  { title: "Scripture hub", description: "Follow each passage into study notes and application.", href: "/studies" },
  { title: "AI companion", description: "Ask questions, explore themes, and gather prayer prompts.", href: "/companion" },
  { title: "Devotionals", description: "Read short reflections for daily attention and encouragement.", href: "/devotionals" },
];

const readerJourney = [
  "Watch the latest episode",
  "Read the linked passage",
  "Reflect with the companion",
  "Return to the next episode",
];

export default function Home() {
  return (
    <main className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-[#2A2438] bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.22),_transparent_45%),linear-gradient(135deg,_rgba(22,19,32,0.96),_rgba(11,10,15,0.98))] p-8 shadow-[0_0_90px_rgba(124,58,237,0.16)] sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-[#A855F7]">
              A new home for Scripture, teaching, and reflection
            </p>
            <h1 className="font-serif text-4xl leading-tight text-[#F5F3F7] sm:text-5xl">
              The Gor Bible Project is a guided study experience for people who want to go deeper.
            </h1>
            <p className="max-w-2xl text-lg text-[#A1A1AA]">
              This is the entry point for the full experience: learn the mission, join the rhythm of the content, and move from episode to passage to reflection in one clear path.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/episodes" className="rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#A855F7]">
                Explore new episodes
              </Link>
              <Link href="/about" className="rounded-full border border-[#2A2438] px-5 py-3 text-sm font-medium text-[#F5F3F7] transition hover:border-[#7C3AED]">
                Learn the mission
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#2A2438] bg-[#0B0A0F]/70 p-6">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#A855F7]">Reader flow</p>
            <div className="mt-4 space-y-3">
              {readerJourney.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-xl border border-[#2A2438] bg-[#161320]/70 p-3 text-sm text-[#F5F3F7]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7C3AED] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#A855F7]">Now streaming</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#F5F3F7]">Romans 8 — The Spirit and the Believer</h2>
            </div>
            <span className="rounded-full border border-[#2A2438] px-3 py-1 text-xs text-[#A1A1AA]">Latest episode</span>
          </div>

          <div className="flex aspect-video items-center justify-center rounded-2xl border border-[#2A2438] bg-gradient-to-br from-[#7C3AED]/25 via-[#161320] to-[#0B0A0F]">
            <div className="rounded-full border border-[#A855F7]/50 bg-[#0B0A0F]/80 px-4 py-2 text-sm text-[#F5F3F7]">
              Video player placeholder
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-[#A1A1AA]">
            A new episode designed to move from teaching into reflection, then into passage study and prayerful application.
          </p>
        </article>

        <article className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#A855F7]">What you’ll find here</p>
          <div className="mt-4 space-y-3 text-sm text-[#A1A1AA]">
            <div className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3">• Deep teaching content tied to Scripture and reflection</div>
            <div className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3">• A clear path from episode to study to daily application</div>
            <div className="rounded-xl border border-[#2A2438] bg-[#0B0A0F]/70 p-3">• An AI companion for questions, notes, and prayer prompts</div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((link) => (
          <Link key={link.title} href={link.href} className="rounded-[20px] border border-[#2A2438] bg-[#161320]/80 p-5 transition hover:-translate-y-1 hover:border-[#7C3AED]">
            <h3 className="text-lg font-semibold text-[#F5F3F7]">{link.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#A1A1AA]">{link.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
