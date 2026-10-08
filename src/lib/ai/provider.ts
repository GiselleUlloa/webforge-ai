import { GeneratedProject } from "@/types/project";
import { editProjectFromPrompt, generateProjectFromPrompt } from "@/lib/generator/project";

export type ProviderName = "openai" | "gemini" | "ollama" | "mock";

export type ProviderContext = {
  prompt: string;
  project?: GeneratedProject;
  instruction?: string;
};

export interface AIProvider {
  name: ProviderName;
  generate(context: ProviderContext): Promise<GeneratedProject>;
  edit(context: ProviderContext): Promise<GeneratedProject>;
}

export const fallbackProvider: AIProvider = {
  name: "mock",
  async generate({ prompt }) {
    return generateProjectFromPrompt(prompt);
  },
  async edit({ prompt, project, instruction }) {
    if (!project || !instruction) {
      return generateProjectFromPrompt(prompt);
    }

    return editProjectFromPrompt(project, instruction);
  },
};
