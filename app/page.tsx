"use client";

import { useMemo, useState } from "react";
import { getProvider, listProviders } from "@/lib/ai/providers";
import { GeneratedWebsite, SupportedProvider } from "@/lib/ai/types";
import {
  buildPreviewDocument,
  exportProjectHtml,
  exportProjectJson,
} from "@/lib/export/project-export";

type CodeTab = "html" | "css" | "js";

const codeTabLabels: Record<CodeTab, string> = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
};

export default function Home() {
  const [providerId, setProviderId] = useState<SupportedProvider>("mock");
  const [prompt, setPrompt] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [selectedTab, setSelectedTab] = useState<CodeTab>("html");
  const [website, setWebsite] = useState<GeneratedWebsite | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const providers = listProviders();
  const previewDocument = useMemo(
    () => (website ? buildPreviewDocument(website) : ""),
    [website],
  );

  const generateWebsite = async () => {
    if (!prompt.trim()) {
      setError("Please describe the website you want to generate.");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const provider = getProvider(providerId);
      const generatedWebsite = await provider.generateWebsite({ prompt });
      setWebsite(generatedWebsite);
      setSelectedTab("html");
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Website generation failed.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const applyEdit = async () => {
    if (!website || !editPrompt.trim()) {
      return;
    }

    setError(null);
    setIsEditing(true);

    try {
      const provider = getProvider(providerId);
      const updatedWebsite = await provider.editWebsite({
        website,
        prompt: editPrompt,
      });
      setWebsite(updatedWebsite);
      setEditPrompt("");
    } catch (editError) {
      setError(editError instanceof Error ? editError.message : "Edit failed.");
    } finally {
      setIsEditing(false);
    }
  };

  const activeCode = website ? website[selectedTab] : "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">WebForge AI</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Turn ideas into websites.
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Describe your website in natural language, generate responsive code,
            preview it instantly, and iterate with simple AI-powered edits.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Generate a website</h2>
            <label className="mt-4 block text-sm text-slate-300" htmlFor="provider">
              AI provider
            </label>
            <select
              id="provider"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              onChange={(event) => setProviderId(event.target.value as SupportedProvider)}
              value={providerId}
            >
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
            <label className="mt-4 block text-sm text-slate-300" htmlFor="website-prompt">
              Website prompt
            </label>
            <textarea
              id="website-prompt"
              className="mt-2 min-h-40 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Example: A modern cafe website with menu, testimonials, and contact section."
              value={prompt}
            />
            <button
              className="mt-4 w-full rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isGenerating}
              onClick={generateWebsite}
              type="button"
            >
              {isGenerating ? "Generating..." : "Generate Website"}
            </button>

            <div className="mt-6 border-t border-slate-800 pt-6">
              <h3 className="font-semibold">AI edit request</h3>
              <textarea
                className="mt-3 min-h-28 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                onChange={(event) => setEditPrompt(event.target.value)}
                placeholder="Example: Make the hero section more minimal and add a pricing section."
                value={editPrompt}
              />
              <button
                className="mt-3 w-full rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:border-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!website || isEditing}
                onClick={applyEdit}
                type="button"
              >
                {isEditing ? "Applying Edit..." : "Apply Edit"}
              </button>
            </div>

            {error ? (
              <p className="mt-4 rounded-lg border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                {error}
              </p>
            ) : null}
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Website preview</h2>
                <div className="flex gap-2">
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-1 text-xs transition hover:border-sky-400 disabled:opacity-50"
                    disabled={!website}
                    onClick={() => website && exportProjectHtml(website)}
                    type="button"
                  >
                    Download HTML
                  </button>
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-1 text-xs transition hover:border-sky-400 disabled:opacity-50"
                    disabled={!website}
                    onClick={() => website && exportProjectJson(website)}
                    type="button"
                  >
                    Export JSON
                  </button>
                </div>
              </div>
              {website ? (
                <iframe
                  className="h-[420px] w-full rounded-xl border border-slate-800 bg-white"
                  sandbox="allow-scripts"
                  srcDoc={previewDocument}
                  title="Generated website preview"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 text-sm text-slate-400">
                  Generate a website to preview it here.
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Code viewer</h2>
                <div className="flex gap-2">
                  {(Object.keys(codeTabLabels) as CodeTab[]).map((tab) => (
                    <button
                      key={tab}
                      className={`rounded-lg px-3 py-1 text-xs ${
                        selectedTab === tab
                          ? "bg-sky-500 font-medium text-slate-950"
                          : "border border-slate-700"
                      }`}
                      onClick={() => setSelectedTab(tab)}
                      type="button"
                    >
                      {codeTabLabels[tab]}
                    </button>
                  ))}
                </div>
              </div>
              <pre className="mt-3 max-h-80 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs leading-relaxed text-slate-200">
                <code>{activeCode || "Generate a website to inspect HTML, CSS, and JS output."}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
