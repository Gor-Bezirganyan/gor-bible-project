"use client";

import { useMemo, useState } from "react";

type CompanionMessage = {
  role: "user" | "assistant" | "system";
  text: string;
};

type AiCompanionBubbleProps = {
  title?: string;
  summary?: string;
  outline?: string[];
  passages?: string[];
};

const starterPrompts = [
  "What is a good way to pray about this?",
  "Give me a short reflection on this topic.",
  "How can I stay encouraged today?",
  "Help me understand this idea more clearly.",
];

async function fetchAiAnswer(question: string, context: AiCompanionBubbleProps) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, context }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error ?? "AI request failed.");
  }

  return data.answer as string;
}

export function AiCompanionBubble({ title, summary, outline, passages }: AiCompanionBubbleProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<CompanionMessage[]>([
    {
      role: "assistant",
      text: title
        ? `Ask me anything about “${title}”. I can help explain it, connect the themes, or summarize the main ideas.`
        : "Ask me anything — I can help answer questions, reflect with you, or explain ideas clearly.",
    },
  ]);

  const quickReplies = useMemo(
    () => starterPrompts.map((prompt) => ({ label: prompt, value: prompt })),
    []
  );

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((current) => [...current, { role: "user", text }] as CompanionMessage[]);
    setInput("");
    setLoading(true);

    try {
      const answer = await fetchAiAnswer(text, { title, summary, outline, passages });
      setMessages((current) => [...current, { role: "assistant", text: answer }] as CompanionMessage[]);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : "Something went wrong.";
      setMessages((current) => [...current, { role: "assistant", text: `AI error: ${errorText}` }] as CompanionMessage[]);
    } finally {
      setLoading(false);
    }
  };

  const messageElements = messages.map((message, index) => {
    const bubbleClassName =
      message.role === "assistant"
        ? "rounded-3xl px-4 py-3 bg-[#15121B] text-[#F8FAFC]"
        : "rounded-3xl px-4 py-3 bg-[#2E243E] text-[#E5E7EB] self-end";

    return (
      <div key={`${message.role}-${index}`} className={bubbleClassName}>
        <p>{message.text}</p>
      </div>
    );
  });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          type="button"
          className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#7C3AED] bg-[#7C3AED]/15 text-white shadow-lg shadow-[#7C3AED]/20 transition hover:bg-[#7C3AED] hover:text-[#0B0A0F]"
          onClick={() => setOpen(true)}
          aria-label="Talk to Sola"
          title="Talk to Sola"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#F5F3F7]" fill="currentColor" aria-hidden="true">
            <path d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5H12.75V20.25a.75.75 0 0 1-1.5 0V12.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" />
          </svg>
        </button>
      ) : (
        <div className="rounded-[32px] border border-[#3B2E58] bg-[#0B0A0F]/95 shadow-[0_15px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl max-w-sm sm:max-w-md">
          <div className="flex items-center justify-between gap-3 rounded-[32px] bg-[#17131E] px-4 py-3 text-white shadow-inner shadow-black/20">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#A855F7]">AI Companion</p>
              <p className="text-sm text-[#E7E5E8]">Ask Sola anything — I can help explain ideas, reflect, or answer study questions.</p>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20 transition hover:bg-[#A855F7]"
              onClick={() => setOpen(false)}
              aria-label="Close Sola"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5H12.75V20.25a.75.75 0 0 1-1.5 0V12.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" />
              </svg>
            </button>
          </div>

          <div className="border-t border-[#3B2E58] p-4">
            <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1 text-sm text-[#E5E7EB]">
              {messageElements}
            </div>

            <div className="mt-4 space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.value}
                    type="button"
                    className="rounded-2xl border border-[#3B2E58] bg-[#0B0A0F]/80 px-3 py-2 text-left text-xs text-[#F5F3F7] transition hover:border-[#7C3AED] hover:bg-[#1F1734]"
                    onClick={() => sendMessage(reply.value)}
                  >
                    {reply.label}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="flex-1 rounded-2xl border border-[#3B2E58] bg-[#0B0A0F]/80 px-3 py-2 text-sm text-[#F5F3F7] outline-none transition focus:border-[#7C3AED]"
                  placeholder="Ask a general question"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#A855F7]"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
