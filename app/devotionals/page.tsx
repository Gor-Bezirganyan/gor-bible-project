import { devotionals } from "../data/site-content";

export default function DevotionalsPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A855F7]">Devotionals</p>
        <h1 className="mt-3 font-serif text-3xl text-[#F5F3F7] sm:text-4xl">
          Short reflections that can be shared, reused, and expanded later.
        </h1>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {devotionals.map((item) => (
          <article key={item.title} className="rounded-[22px] border border-[#2A2438] bg-[#0B0A0F]/70 p-6">
            <p className="text-sm text-[#A855F7]">{item.theme}</p>
            <h2 className="mt-2 font-serif text-2xl text-[#F5F3F7]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{item.blurb}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
