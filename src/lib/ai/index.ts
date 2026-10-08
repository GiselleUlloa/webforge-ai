import { AIProvider, fallbackProvider, ProviderName } from "./provider";
import { geminiProvider } from "./gemini";
import { ollamaProvider } from "./ollama";
import { openAIProvider } from "./openai";

export function getProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER ?? "mock") as ProviderName;

  switch (provider) {
    case "openai":
      return openAIProvider;
    case "gemini":
      return geminiProvider;
    case "ollama":
      return ollamaProvider;
    default:
      return fallbackProvider;
  }
}
