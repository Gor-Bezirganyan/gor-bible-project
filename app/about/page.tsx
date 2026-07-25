export default function AboutPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A855F7]">About</p>
        <h1 className="mt-3 font-serif text-3xl text-[#F5F3F7] sm:text-4xl">
          The mission behind the project.
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[#A1A1AA]">
          The Gor Bible Project exists to make Scripture more accessible, more connected, and more useful in everyday life.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[22px] border border-[#2A2438] bg-[#0B0A0F]/70 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">What this site is trying to do</h2>
          <p className="mt-4 text-sm leading-8 text-[#A1A1AA]">
            It brings together video teaching, Scripture study, AI-guided reflection, and devotional rhythm so the experience feels like one story instead of disconnected content.
          </p>
        </article>

        <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">The long-term vision</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#A1A1AA]">
            <li>• Episode hubs linked to chapter study pages</li>
            <li>• A companion that helps people ask better questions</li>
            <li>• A devotional rhythm that supports discipleship and reflection</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
