import { GeneratedProject } from "@/types/project";
import { sanitizeFragment } from "./sanitize";

const FALLBACK_SECTIONS = [
  { keyword: "menu", title: "Menu", body: "Highlight your best products and signature options." },
  { keyword: "pricing", title: "Pricing", body: "Show clear plans and pricing details." },
  { keyword: "testimonial", title: "Testimonials", body: "Build trust with customer feedback." },
  { keyword: "contact", title: "Contact", body: "Make it easy for visitors to reach out." },
  { keyword: "location", title: "Location", body: "Share address details and visiting information." },
  { keyword: "about", title: "About", body: "Tell your story and what makes you unique." },
];

function inferTitle(prompt: string): string {
  const trimmed = prompt.trim();
  if (!trimmed) {
    return "WebForge Project";
  }

  const firstSentence = trimmed.split(/[.!?]/)[0] ?? "";
  const title = firstSentence.slice(0, 60).trim();
  return title ? title.replace(/^create\s+/i, "") : "WebForge Project";
}

function detectSections(prompt: string): Array<{ title: string; body: string }> {
  const lowerPrompt = prompt.toLowerCase();
  const selected = FALLBACK_SECTIONS.filter((item) => lowerPrompt.includes(item.keyword)).map(
    ({ title, body }) => ({ title, body }),
  );

  if (selected.length >= 2) {
    return selected;
  }

  return [
    { title: "Services", body: "Describe the core services or products you offer." },
    { title: "Why Choose Us", body: "Share the outcomes and value customers receive." },
    { title: "Get Started", body: "Guide visitors to the next action with confidence." },
  ];
}

function supportsWhatsapp(prompt: string): boolean {
  return prompt.toLowerCase().includes("whatsapp");
}

function buildBaseProject(prompt: string): GeneratedProject {
  const sections = detectSections(prompt);
  const title = inferTitle(prompt);
  const year = new Date().getFullYear();

  const sectionHtml = sections
    .map(
      (section) => `
      <article class="card">
        <h3>${section.title}</h3>
        <p>${section.body}</p>
        <button type="button">Learn more</button>
      </article>`,
    )
    .join("\n");

  const whatsappCta = supportsWhatsapp(prompt)
    ? `<a class="whatsapp" href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>`
    : "";

  const html = `
<header class="topbar">
  <div class="brand">${title}</div>
  <nav>
    <a href="#home">Home</a>
    <a href="#sections">Sections</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<main>
  <section id="home" class="hero">
    <p class="eyebrow">Turn ideas into websites.</p>
    <h1>${title}</h1>
    <p>${prompt}</p>
    <div class="hero-actions">
      <button type="button">Start now</button>
      <button type="button" class="secondary">See examples</button>
    </div>
    ${whatsappCta}
  </section>

  <section id="sections" class="grid">
    ${sectionHtml}
  </section>

  <section id="contact" class="contact">
    <h2>Contact us</h2>
    <form>
      <label>
        Name
        <input type="text" name="name" placeholder="Your name" />
      </label>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" />
      </label>
      <label>
        Message
        <textarea name="message" rows="4" placeholder="How can we help?"></textarea>
      </label>
      <button type="submit">Send message</button>
    </form>
  </section>
</main>

<footer>
  <small>© ${year} ${title}. Built with WebForge AI.</small>
</footer>
`;

  const css = `
:root {
  color-scheme: light;
  --bg: #f8fafc;
  --surface: #ffffff;
  --text: #0f172a;
  --muted: #475569;
  --primary: #2563eb;
  --primary-soft: #dbeafe;
  --border: #e2e8f0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
}

.topbar {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.brand {
  font-weight: 700;
}

nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

nav a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
}

main {
  max-width: 1040px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.hero {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.eyebrow {
  display: inline-block;
  margin: 0;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 0.7rem 1rem;
  background: var(--primary);
  color: white;
  cursor: pointer;
  font-weight: 600;
}

button.secondary {
  background: white;
  color: var(--text);
  border: 1px solid var(--border);
}

.whatsapp {
  display: inline-flex;
  margin-top: 1rem;
  text-decoration: none;
  color: #047857;
  font-weight: 700;
}

.grid {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1rem;
}

.contact {
  margin-top: 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
}

form {
  display: grid;
  gap: 0.9rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  font: inherit;
}

footer {
  text-align: center;
  color: var(--muted);
  padding: 1rem 0 2rem;
}

@media (max-width: 768px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero {
    padding: 1.4rem;
  }
}
`;

  return {
    title,
    prompt,
    html: sanitizeFragment(html),
    css: sanitizeFragment(css),
    js: "document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => { event.preventDefault(); alert('Thanks! We will reach out soon.'); }));",
    updatedAt: new Date().toISOString(),
  };
}

export function generateProjectFromPrompt(prompt: string): GeneratedProject {
  return buildBaseProject(prompt);
}

export function editProjectFromPrompt(
  project: GeneratedProject,
  instruction: string,
): GeneratedProject {
  const lowerInstruction = instruction.toLowerCase();
  const nextProject: GeneratedProject = {
    ...project,
    updatedAt: new Date().toISOString(),
  };

  if (lowerInstruction.includes("purple")) {
    nextProject.css = nextProject.css.replace(/--primary:\s*#[0-9a-fA-F]{3,8};/, "--primary: #7c3aed;");
    nextProject.css = nextProject.css.replace(
      /--primary-soft:\s*#[0-9a-fA-F]{3,8};/,
      "--primary-soft: #ede9fe;",
    );
  }

  if (lowerInstruction.includes("minimal")) {
    nextProject.css = `${nextProject.css}\n.hero, .card, .contact { box-shadow: none; border-radius: 10px; }\n`;
  }

  if (lowerInstruction.includes("testimonial") && !nextProject.html.toLowerCase().includes("testimonials")) {
    nextProject.html = nextProject.html.replace(
      "</main>",
      `<section class="contact"><h2>Testimonials</h2><p>\"WebForge helped us launch in one day.\" — Happy customer</p></section></main>`,
    );
  }

  if (lowerInstruction.includes("pricing") && !nextProject.html.toLowerCase().includes("pricing")) {
    nextProject.html = nextProject.html.replace(
      "</main>",
      `<section class="contact"><h2>Pricing</h2><div class="grid"><article class="card"><h3>Starter</h3><p>$29/mo</p></article><article class="card"><h3>Growth</h3><p>$79/mo</p></article><article class="card"><h3>Scale</h3><p>$149/mo</p></article></div></section></main>`,
    );
  }

  if (lowerInstruction.includes("whatsapp") && !nextProject.html.toLowerCase().includes("wa.me")) {
    nextProject.html = nextProject.html.replace(
      "</section>\n\n  <section id=\"sections\"",
      '<a class="whatsapp" href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></section>\n\n  <section id="sections"',
    );
  }

  if (lowerInstruction.includes("hero")) {
    const eyebrowStart = nextProject.html.indexOf('<p class="eyebrow">');
    if (eyebrowStart !== -1) {
      const eyebrowEnd = nextProject.html.indexOf("</p>", eyebrowStart);
      if (eyebrowEnd !== -1) {
        nextProject.html =
          nextProject.html.slice(0, eyebrowStart) +
          '<p class="eyebrow">Updated by AI edit</p>' +
          nextProject.html.slice(eyebrowEnd + 4);
      }
    }
  }

  return {
    ...nextProject,
    html: sanitizeFragment(nextProject.html),
    css: sanitizeFragment(nextProject.css),
    js: sanitizeFragment(nextProject.js),
  };
}
