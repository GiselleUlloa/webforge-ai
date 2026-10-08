import { GeneratedProject } from "@/types/project";

export function parseProjectResponse(payload: string): GeneratedProject | null {
  const trimmed = payload.trim();

  const normalized = trimmed.startsWith("```")
    ? trimmed.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim()
    : trimmed;

  try {
    const parsed = JSON.parse(normalized) as Partial<GeneratedProject>;
    if (!parsed.html || !parsed.css || !parsed.js) {
      return null;
    }

    return {
      title: parsed.title ?? "WebForge Project",
      prompt: parsed.prompt ?? "Generated with AI",
      html: parsed.html,
      css: parsed.css,
      js: parsed.js,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function buildProviderPrompt(prompt: string, existingProject?: GeneratedProject, instruction?: string): string {
  if (!existingProject || !instruction) {
    return `Generate a responsive website from this request: ${prompt}. Return only valid JSON with keys title, prompt, html, css, js.`;
  }

  return `Edit this website using the instruction: ${instruction}. Return only valid JSON with keys title, prompt, html, css, js. Original prompt: ${prompt}. Existing html: ${existingProject.html}. Existing css: ${existingProject.css}. Existing js: ${existingProject.js}.`;
}
