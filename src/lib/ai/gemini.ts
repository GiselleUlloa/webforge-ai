import { AIProvider, fallbackProvider, ProviderContext } from "./provider";
import { buildProviderPrompt, parseProjectResponse } from "./parsing";

async function requestGemini(context: ProviderContext): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildProviderPrompt(context.prompt, context.project, context.instruction),
              },
            ],
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

export const geminiProvider: AIProvider = {
  name: "gemini",
  async generate(context) {
    const content = await requestGemini(context);
    const parsed = content ? parseProjectResponse(content) : null;
    return parsed ?? fallbackProvider.generate(context);
  },
  async edit(context) {
    const content = await requestGemini(context);
    const parsed = content ? parseProjectResponse(content) : null;
    return parsed ?? fallbackProvider.edit(context);
  },
};
