# Contributing to WebForge AI

Thanks for helping improve WebForge AI.

## Development setup

1. Fork and clone the repository.
2. Install dependencies:
   - `npm install`
3. Copy `.env.example` to `.env.local` and set your provider values.
4. Start development:
   - `npm run dev`

## Contribution flow

1. Create a feature branch.
2. Keep changes focused and small.
3. Run checks before opening a pull request:
   - `npm run lint`
   - `npm run build`
4. Open a pull request with:
   - Problem statement
   - Summary of changes
   - Manual verification steps

## Architecture notes

- `src/lib/ai/*`: provider abstraction and adapters.
- `src/lib/generator/*`: generation/editing and sanitization helpers.
- `src/app/api/*`: server-side routes for generation, editing, and export.
- `src/components/*`: UI and interaction workflow.

## Coding guidelines

- Use TypeScript for new code.
- Keep provider logic behind the `AIProvider` interface.
- Keep API keys server-side only.
- Avoid introducing dependencies unless needed.
