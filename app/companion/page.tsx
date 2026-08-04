import { starterPrompts } from "../data/site-content";
import { AiCompanionBubble } from "../components/ai-companion-bubble";

export default function CompanionPage() {
  return (
    <> 
      <main className="space-y-8">
      <section className="rounded-[24px] border border-[#2A2438] bg-[#161320]/90 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#A855F7]">AI companion</p>
        <h1 className="mt-3 font-serif text-3xl text-[#F5F3F7] sm:text-4xl">
          A simple companion for study questions, prayer prompts, and reflection.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#A1A1AA]">
          For now this is a polished local interface for the eventual AI-powered experience.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[22px] border border-[#2A2438] bg-[#0B0A0F]/70 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">Starter prompts</h2>
          <div className="mt-4 space-y-3">
            {starterPrompts.map((prompt) => (
              <button key={prompt} className="w-full rounded-xl border border-[#2A2438] bg-[#161320]/70 p-3 text-left text-sm text-[#F5F3F7] transition hover:border-[#7C3AED]">
                {prompt}
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-[22px] border border-[#2A2438] bg-[#161320]/90 p-6">
          <h2 className="text-xl font-semibold text-[#F5F3F7]">Conversation</h2>
          <div className="mt-4 flex min-h-[280px] flex-col justify-between rounded-2xl border border-[#2A2438] bg-[#0B0A0F]/70 p-4">
            <div className="space-y-3 text-sm text-[#A1A1AA]">
              <div className="rounded-xl border border-[#2A2438] bg-[#161320]/70 p-3">
                Companion: “Ask me anything about the passage, the episode, or your reflection.”
              </div>
            </div>
            <div className="rounded-xl border border-[#2A2438] bg-[#161320]/70 p-3 text-sm text-[#F5F3F7]">
              Type your question here…
            </div>
          </div>
        </article>
      </section>
    </main>

      <AiCompanionBubble />
    </>
  );
}
