export type SupportedProvider = "mock" | "openai" | "gemini" | "ollama";

export interface GeneratedWebsite {
  title: string;
  html: string;
  css: string;
  js: string;
}

export interface WebsiteGenerationRequest {
  prompt: string;
}

export interface WebsiteEditRequest {
  website: GeneratedWebsite;
  prompt: string;
}

export interface AIProvider {
  id: SupportedProvider;
  name: string;
  isAvailable: boolean;
  generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsite>;
  editWebsite(request: WebsiteEditRequest): Promise<GeneratedWebsite>;
}
