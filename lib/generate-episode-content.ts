const apiKey = process.env.GEMINI_API_KEY ?? process.env.API_KEY;
const model = process.env.GEMINI_MODEL ?? "gemini-flash-latest";

async function callGemini(prompt: string): Promise<string> {
  if (!apiKey) return "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 2048 },
      }),
      // @ts-expect-error: Next.js fetch extension
      next: { revalidate: 3600 }, // Cache for 1 hour per episode
    });
    if (!res.ok) return "";
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  } catch {
    return "";
  }
}

function parseNumberedList(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^\s*[\d\-\*•]+[\.\)]\s*/, "").replace(/\*\*/g, "").trim())
    .filter((line) => line.length > 2); // lowered threshold so short items aren't dropped
}

export async function generateEpisodeOutline(title: string, summary: string): Promise<string[]> {
  const prompt = `You are a Bible study assistant for "The Gor Bible Project" podcast.
Based on the following episode title and description, generate a concise episode outline with 5-7 key topics or sections covered in the episode.
Format your response as a plain numbered list only — no bold, no extra text before or after the list.
Each item should be a short phrase (5-10 words max).

Episode Title: ${title}
Episode Description: ${summary.replace(/<[^>]*>?/gm, "").slice(0, 800)}

Outline:`;

  const raw = await callGemini(prompt);
  return parseNumberedList(raw);
}

export async function generateReflectionQuestions(title: string, summary: string): Promise<string[]> {
  const prompt = `You are a Bible study assistant for "The Gor Bible Project" podcast.
Based on the following episode title and description, generate exactly 5 thoughtful reflection questions for personal study, journaling, or group discussion.
Format your response as a plain numbered list only — no bold, no extra text before or after the list.
Each question must end with a question mark.

Episode Title: ${title}
Episode Description: ${summary.replace(/<[^>]*>?/gm, "").slice(0, 800)}

Reflection Questions:`;

  const raw = await callGemini(prompt);
  return parseNumberedList(raw).filter((line) => line.endsWith("?"));
}

export async function generateEpisodePassages(title: string, summary: string): Promise<string[]> {
  const prompt = `You are a Bible study assistant for "The Gor Bible Project" podcast.
Based on the following episode title and description, list the specific Bible passages or books referenced or discussed in this episode.
Format your response as a plain numbered list only — no bold, no extra text.
Each item should be a short scripture reference like "Psalm 4", "Romans 8:1-11", or "Genesis 1". Maximum 6 items.
If no specific passages can be identified, return just: None

Episode Title: ${title}
Episode Description: ${summary.replace(/<[^>]*>?/gm, "").slice(0, 800)}

Bible Passages:`;

  const raw = await callGemini(prompt);
  const items = parseNumberedList(raw).filter((p) => p.toLowerCase() !== "none");
  return items;
}
