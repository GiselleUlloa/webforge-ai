import { mockProvider } from "@/lib/ai/providers/mock-provider";
import { AIProvider, SupportedProvider } from "@/lib/ai/types";

const providerRegistry: Record<SupportedProvider, AIProvider> = {
  mock: mockProvider,
  openai: {
    id: "openai",
    name: "OpenAI (coming soon)",
    isAvailable: false,
    async generateWebsite() {
      throw new Error("OpenAI provider is not configured yet.");
    },
    async editWebsite() {
      throw new Error("OpenAI provider is not configured yet.");
    },
  },
  gemini: {
    id: "gemini",
    name: "Gemini (coming soon)",
    isAvailable: false,
    async generateWebsite() {
      throw new Error("Gemini provider is not configured yet.");
    },
    async editWebsite() {
      throw new Error("Gemini provider is not configured yet.");
    },
  },
  ollama: {
    id: "ollama",
    name: "Ollama (coming soon)",
    isAvailable: false,
    async generateWebsite() {
      throw new Error("Ollama provider is not configured yet.");
    },
    async editWebsite() {
      throw new Error("Ollama provider is not configured yet.");
    },
  },
};

export const getProvider = (providerId: SupportedProvider) =>
  providerRegistry[providerId];

export const listProviders = () => Object.values(providerRegistry);
