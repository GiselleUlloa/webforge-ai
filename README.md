# WebForge AI

**Turn ideas into websites.**

WebForge AI is a free and open-source AI website builder MVP. Users can describe a website in natural language and generate a functional, responsive website preview with editable HTML/CSS/JS output.

## MVP Features

- Modern landing page and builder UI
- Prompt input for natural-language website generation
- AI generation interface with pluggable provider architecture
- Live website preview area
- Code viewer for generated HTML, CSS, and JavaScript
- Basic AI editing workflow for follow-up change requests
- Download/export options for generated project output

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and update values as needed:

```bash
cp .env.example .env.local
```

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` – start local development server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – lint project files

## AI Provider Architecture

Provider interfaces and registry are in `lib/ai`.

Current state:

- `mock` provider is active for MVP/demo generation
- `openai`, `gemini`, and `ollama` are scaffolded placeholders for future integrations

## Roadmap

- [ ] Connect real LLM providers (OpenAI, Gemini, Ollama)
- [ ] Add persisted projects and version history
- [ ] Improve code generation quality and template variety
- [ ] Add full project export (zip) and deployment adapters
- [ ] Add authentication and collaboration features

## Open Source

- License: [MIT](./LICENSE)
- Contribution guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

