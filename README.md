# WebForge AI

Free and open-source AI website builder.

**Tagline:** Turn ideas into websites.

WebForge AI lets you describe a website in natural language, generate a responsive site, preview it, edit it with follow-up instructions, inspect source code, and download the result.

## Why this exists

Website creation should be accessible, modifiable, and ownership-friendly. WebForge AI focuses on practical generation and exportable code so users avoid vendor lock-in.

## Core workflow

**Describe → Generate → Preview → Edit → Download**

## MVP features

- Landing page with prompt-first UX and open-source positioning
- AI website generation via server-side provider abstraction
- Secure sandboxed preview (desktop/tablet/mobile)
- AI editing of existing generated project
- Code viewer with Monaco Editor
- ZIP export with project files

## Tech stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- API Routes
- Monaco Editor (`@monaco-editor/react`)

## Architecture overview

```text
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts
│   │   ├── edit/route.ts
│   │   └── export/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── webforge-app.tsx
├── lib/
│   ├── ai/
│   │   ├── provider.ts
│   │   ├── openai.ts
│   │   ├── gemini.ts
│   │   ├── ollama.ts
│   │   └── index.ts
│   ├── generator/
│   │   ├── project.ts
│   │   └── sanitize.ts
│   └── export/
│       └── zip.ts
└── types/
    └── project.ts
```

## Install locally

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

4. Start development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Configure an AI provider

Set `AI_PROVIDER` in `.env.local`:

- `mock` (default fallback)
- `openai`
- `gemini`
- `ollama`

Then set matching provider credentials in `.env.local`.

> API keys remain server-side and are never exposed in frontend code.

## Security approach

- Provider credentials stay in server environment variables
- User input is validated in API routes
- Generated content is sanitized before preview composition
- Preview runs inside sandboxed iframe isolation
- Generated code is exported as files, never executed server-side

## Development

- Lint: `npm run lint`
- Build: `npm run build`

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md).

## Roadmap

Planned future extensions (not in this MVP):

- GitHub export
- Templates and community template gallery
- Project history
- User accounts
- Local-first Ollama workflows
- Additional providers
- One-click deployment
- Import existing sites
- Visual editing
- AI accessibility and SEO assistants

## License

MIT. See [LICENSE](./LICENSE).
