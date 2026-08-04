import { NextRequest, NextResponse } from "next/server";

const model = process.env.GEMINI_MODEL;
const apiKey = process.env.GEMINI_API_KEY ?? process.env.API_KEY;

async function generateText(prompt: string) {
  if (!apiKey) {
    throw new Error("Missing Gemini API key. Set GEMINI_API_KEY or API_KEY in .env.local.");
  }
  if (!model) {
    throw new Error("Missing Gemini model. Set GEMINI_MODEL in .env.local (e.g. GEMINI_MODEL=gemini-2.5-flash).");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  
  let response;
  let retries = 3;
  
  while (retries > 0) {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (response.ok || response.status < 429) {
      break; // Success or a non-retryable client error (like 400 Bad Request)
    }
    
    // If we hit 429 (Rate Limit) or 50x (Server Error), wait and retry
    retries--;
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2 seconds before retrying
    }
  }

  if (!response || !response.ok) {
    const errorText = await response?.text();
    throw new Error(`Gemini API failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return candidate;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, context } = body as {
      question?: string;
      context?: Record<string, unknown>;
    };

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Missing question." }, { status: 400 });
    }

    const lines = [
      "You are a helpful AI companion that answers questions clearly, kindly, and thoughtfully.",
      "Use additional context only when it is provided.",
    ];

    if (context) {
      if (context.title) lines.push(`Title: ${context.title}`);
      if (context.summary) lines.push(`Summary: ${context.summary}`);
      if (Array.isArray(context.outline) && context.outline.length) {
        lines.push("Outline:");
        (context.outline as string[]).forEach((item) => lines.push(`- ${item}`));
      }
      if (Array.isArray(context.passages) && context.passages.length) {
        lines.push(`Passages: ${(context.passages as string[]).join(", ")}`);
      }
    }

    lines.push("Question:");
    lines.push(question.trim());
    lines.push("Answer:");

    const answer = await generateText(lines.join("\n"));
    return NextResponse.json({ answer });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
