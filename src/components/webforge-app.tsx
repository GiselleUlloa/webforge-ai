"use client";

import Editor from "@monaco-editor/react";
import { useMemo, useState } from "react";
import { buildPreviewDocument } from "@/lib/generator/sanitize";
import { DeviceMode, GeneratedProject } from "@/types/project";

const DEVICE_CLASS: Record<DeviceMode, string> = {
  desktop: "w-full",
  tablet: "mx-auto w-[820px] max-w-full",
  mobile: "mx-auto w-[420px] max-w-full",
};

type CodeTab = "html" | "css" | "js";

export function WebforgeApp() {
  const [prompt, setPrompt] = useState("");
  const [instruction, setInstruction] = useState("");
  const [project, setProject] = useState<GeneratedProject | null>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [codeTab, setCodeTab] = useState<CodeTab>("html");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [provider, setProvider] = useState("-");
  const [error, setError] = useState("");

  const preview = useMemo(() => {
    if (!project) {
      return "";
    }

    return buildPreviewDocument(project.html, project.css, project.js);
  }, [project]);

  const code = useMemo(() => {
    if (!project) {
      return "";
    }

    if (codeTab === "html") {
      return project.html;
    }

    if (codeTab === "css") {
      return project.css;
    }

    return project.js;
  }, [codeTab, project]);

  async function generateWebsite() {
    if (!prompt.trim()) {
      setError("Describe the website first.");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = (await response.json()) as {
        error?: string;
        provider?: string;
        project?: GeneratedProject;
      };

      if (!response.ok || !data.project) {
        setError(data.error ?? "Generation failed.");
        return;
      }

      setProject(data.project);
      setProvider(data.provider ?? "-");
    } catch {
      setError("Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function editWebsite() {
    if (!project || !instruction.trim()) {
      setError("Add an edit instruction first.");
      return;
    }

    setError("");
    setIsEditing(true);

    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          instruction,
          project,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        provider?: string;
        project?: GeneratedProject;
      };

      if (!response.ok || !data.project) {
        setError(data.error ?? "Editing failed.");
        return;
      }

      setProject(data.project);
      setProvider(data.provider ?? "-");
      setInstruction("");
    } catch {
      setError("Editing failed.");
    } finally {
      setIsEditing(false);
    }
  }

  async function downloadProject() {
    if (!project) {
      return;
    }

    const response = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project }),
    });

    if (!response.ok) {
      setError("Export failed.");
      return;
    }

    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "webforge-project.zip";
    anchor.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-blue-700">Free & Open Source</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">WebForge AI</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Turn ideas into websites. Describe your site, generate code, preview, edit, and export.</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <label className="text-sm font-semibold text-slate-800" htmlFor="main-prompt">
          Describe your website
        </label>
        <textarea
          id="main-prompt"
          className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-500 focus:ring"
          placeholder="Create a modern website for a coffee shop in Cartagena with hero, menu, location and WhatsApp button."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={generateWebsite}
            disabled={isGenerating}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isGenerating ? "Generating..." : "Create website"}
          </button>
          <span className="text-xs text-slate-500">Provider: {provider}</span>
        </div>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
            <div className="flex gap-2">
              {(["desktop", "tablet", "mobile"] as DeviceMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDeviceMode(mode)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize ${
                    mode === deviceMode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-3">
            {project ? (
              <iframe
                title="Generated website preview"
                sandbox="allow-scripts allow-forms"
                srcDoc={preview}
                className={`h-[560px] rounded-lg border border-slate-300 bg-white ${DEVICE_CLASS[deviceMode]}`}
              />
            ) : (
              <div className="flex h-[560px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-slate-500">
                Your website preview appears here.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">AI edit</h2>
          <p className="mt-1 text-sm text-slate-600">Refine the existing website without starting from scratch.</p>
          <textarea
            className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-500 focus:ring"
            placeholder='Try: "Change the primary color to purple"'
            value={instruction}
            onChange={(event) => setInstruction(event.target.value)}
          />
          <button
            type="button"
            onClick={editWebsite}
            disabled={isEditing || !project}
            className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isEditing ? "Applying edit..." : "Apply edit"}
          </button>

          <hr className="my-5 border-slate-200" />

          <button
            type="button"
            onClick={downloadProject}
            disabled={!project}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            Download ZIP
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Code viewer</h2>
          <div className="flex gap-2">
            {(["html", "css", "js"] as CodeTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setCodeTab(tab)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase ${
                  codeTab === tab ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <Editor
          language={codeTab === "js" ? "javascript" : codeTab}
          value={code || "// Generate a website to inspect source code"}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            readOnly: true,
            fontSize: 13,
            lineNumbers: "on",
            wordWrap: "on",
          }}
          height="360px"
        />
      </section>
    </div>
  );
}
