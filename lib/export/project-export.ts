import { GeneratedWebsite } from "@/lib/ai/types";

const buildDocument = (website: GeneratedWebsite) => `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${website.title}</title>\n    <style>\n${website.css}\n    </style>\n  </head>\n  <body>\n${website.html}\n    <script>\n${website.js}\n    </script>\n  </body>\n</html>`;

const downloadBlob = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export const exportProjectHtml = (website: GeneratedWebsite) => {
  downloadBlob(buildDocument(website), "index.html", "text/html;charset=utf-8");
};

export const exportProjectJson = (website: GeneratedWebsite) => {
  downloadBlob(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        files: {
          "index.html": website.html,
          "styles.css": website.css,
          "script.js": website.js,
        },
      },
      null,
      2,
    ),
    "webforge-project.json",
    "application/json;charset=utf-8",
  );
};

export const buildPreviewDocument = (website: GeneratedWebsite) =>
  buildDocument(website);
