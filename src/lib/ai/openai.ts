import { AIProvider, fallbackProvider, ProviderContext } from "./provider";
import { buildProviderPrompt, parseProjectResponse } from "./parsing";

const endpoint = "https://api.openai.com/v1/responses";

async function requestOpenAI(context: ProviderContext): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: buildProviderPrompt(context.prompt, context.project, context.instruction),
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    output_text?: string;
  };

  return data.output_text ?? null;
}

export const openAIProvider: AIProvider = {
  name: "openai",
  async generate(context) {
    const content = await requestOpenAI(context);
    const parsed = content ? parseProjectResponse(content) : null;
    return parsed ?? fallbackProvider.generate(context);
  },
  async edit(context) {
    const content = await requestOpenAI(context);
    const parsed = content ? parseProjectResponse(content) : null;
    return parsed ?? fallbackProvider.edit(context);
  },
};
