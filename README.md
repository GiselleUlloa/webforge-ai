# WebForge AI

**Free and open-source AI website builder. Turn ideas into websites.**

WebForge AI is an open-source website builder that uses artificial intelligence to turn natural-language ideas into functional, responsive websites.

Describe what you want to build, generate the website, preview it, edit it with AI, inspect the code, and download your project.

## ✨ What is WebForge AI?

Creating a website shouldn't require starting from scratch.

With WebForge AI, you can describe your idea in natural language and let AI generate the initial website for you.

For example:

> Create a modern website for a coffee shop in Cartagena with a menu, location, contact information and a WhatsApp button.

WebForge AI transforms that idea into a website that you can customize and own.

## 🚀 Features

* 🤖 AI-powered website generation
* 📝 Natural-language prompts
* 📱 Responsive website previews
* ✏️ AI-powered editing
* 💻 Generated source code
* 📦 Downloadable projects
* 🔌 Support for multiple AI providers
* 🌱 Open-source and community-driven

## 🛠️ Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* AI provider integrations

The architecture is designed to support different AI providers, including:

* Gemini
* OpenAI
* Ollama
* Other compatible providers

## 🔄 How it works

```text
Describe
   ↓
Generate
   ↓
Preview
   ↓
Edit with AI
   ↓
Inspect code
   ↓
Download
```

## 📦 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/GiselleUlloa/webforge-ai.git
```

Enter the project directory:

```bash
cd webforge-ai
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Add the required AI provider configuration to `.env.local`.

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🧩 Project Structure

```text
webforge-ai/
├── app/
├── components/
├── lib/
│   ├── ai/
│   ├── generator/
│   └── export/
├── types/
├── public/
├── README.md
├── CONTRIBUTING.md
├── .env.example
└── LICENSE
```

## 🗺️ Roadmap

### MVP

* [x] Project setup
* [ ] Website generation
* [ ] Website preview
* [ ] AI editing
* [ ] Code viewer
* [ ] Project download

### Future

* [ ] GitHub export
* [ ] Website templates
* [ ] Project history
* [ ] User accounts
* [ ] Local AI with Ollama
* [ ] More AI providers
* [ ] One-click deployment
* [ ] Community templates
* [ ] Visual editing
* [ ] AI-powered SEO
* [ ] AI-powered accessibility improvements

## 🤝 Contributing

WebForge AI is an open-source project and contributions are welcome.

You can contribute by:

* Fixing bugs
* Improving documentation
* Adding features
* Creating templates
* Improving the UI/UX
* Adding AI provider integrations
* Writing tests
* Suggesting ideas
* Opening issues
* Submitting pull requests

Check [CONTRIBUTING.md](CONTRIBUTING.md) to learn more.

## 🔐 Security

Generated code should be handled carefully.

WebForge AI is designed with security in mind:

* API keys remain server-side.
* Generated code should not be executed directly on the server.
* Website previews should use sandboxed isolation.
* User input should be validated and sanitized.

If you discover a security issue, please report it responsibly.

## 📄 License

WebForge AI is released under the **MIT License**.

## 🌱 Vision

WebForge AI aims to make website creation more accessible by combining artificial intelligence with open-source software.

**Describe it. Build it. Own it.**

---

Made with curiosity, code, and AI. 🚀
