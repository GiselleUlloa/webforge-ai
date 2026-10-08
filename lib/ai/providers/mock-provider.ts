import {
  AIProvider,
  GeneratedWebsite,
  WebsiteEditRequest,
  WebsiteGenerationRequest,
} from "@/lib/ai/types";

const escapeHtml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const toTitle = (prompt: string) => {
  const cleaned = prompt.trim();
  if (!cleaned) {
    return "Untitled Website";
  }

  const words = cleaned.split(/\s+/).slice(0, 8);
  const result = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return result.length > 56 ? `${result.slice(0, 53)}...` : result;
};

const createWebsite = (prompt: string): GeneratedWebsite => {
  const safePrompt = escapeHtml(prompt.trim());
  const title = toTitle(prompt);

  return {
    title,
    html: `<header class="hero">\n  <h1>${title}</h1>\n  <p>${safePrompt}</p>\n  <button id="ctaButton">Get Started</button>\n</header>\n<main class="content">\n  <section>\n    <h2>About this site</h2>\n    <p>This page was generated from your prompt in WebForge AI.</p>\n  </section>\n</main>`,
    css: `:root {\n  color-scheme: light;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: Inter, system-ui, -apple-system, sans-serif;\n  background: linear-gradient(180deg, #f8fafc, #e2e8f0);\n  color: #0f172a;\n}\n\n.hero {\n  text-align: center;\n  padding: 4rem 1.5rem 3rem;\n}\n\n.hero h1 {\n  margin: 0;\n  font-size: clamp(2rem, 5vw, 3rem);\n}\n\n.hero p {\n  margin: 1rem auto 0;\n  max-width: 42rem;\n  line-height: 1.6;\n}\n\nbutton {\n  margin-top: 1.5rem;\n  border: 0;\n  border-radius: 9999px;\n  padding: 0.75rem 1.5rem;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n\n.content {\n  max-width: 64rem;\n  margin: 0 auto;\n  padding: 0 1.5rem 3rem;\n}\n\nsection {\n  border-radius: 1rem;\n  background: white;\n  padding: 1.5rem;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n}\n\n@media (max-width: 640px) {\n  .hero {\n    padding-top: 3rem;\n  }\n}`,
    js: `const button = document.getElementById("ctaButton");\nif (button) {\n  button.addEventListener("click", () => {\n    alert("Thanks for exploring this generated website!");\n  });\n}`,
  };
};

const applyEdit = ({ website, prompt }: WebsiteEditRequest): GeneratedWebsite => {
  const note = escapeHtml(prompt.trim());
  if (!note) {
    return website;
  }

  return {
    ...website,
    html: `${website.html}\n<section class="update">\n  <h2>Requested update</h2>\n  <p>${note}</p>\n</section>`,
    css: `${website.css}\n\n.update {\n  margin-top: 1.25rem;\n  border-top: 1px solid #cbd5e1;\n  padding-top: 1.25rem;\n}`,
  };
};

export const mockProvider: AIProvider = {
  id: "mock",
  name: "Demo provider",
  isAvailable: true,
  async generateWebsite(request: WebsiteGenerationRequest) {
    return createWebsite(request.prompt);
  },
  async editWebsite(request: WebsiteEditRequest) {
    return applyEdit(request);
  },
};
