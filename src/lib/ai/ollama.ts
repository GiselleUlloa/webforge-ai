import { AIProvider, fallbackProvider, ProviderContext } from "./provider";
import { buildProviderPrompt, parseProjectResponse } from "./parsing";

async function requestOllama(context: ProviderContext): Promise<string | null> {
  const host = process.env.OLLAMA_HOST;
  if (!host) {
    return null;
  }

  const response = await fetch(`${host.replace(/\/$/, "")}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL ?? "llama3.1",
      prompt: buildProviderPrompt(context.prompt, context.project, context.instruction),
      stream: false,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { response?: string };
  return data.response ?? null;
}

export const ollamaProvider: AIProvider = {
  name: "ollama",
  async generate(context) {
    const content = await requestOllama(context);
    const parsed = content ? parseProjectResponse(content) : null;
    return parsed ?? fallbackProvider.generate(context);
  },
  async edit(context) {
    const content = await requestOllama(context);
    const parsed = content ? parseProjectResponse(content) : null;
    return parsed ?? fallbackProvider.edit(context);
  },
};
