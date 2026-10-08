const BLOCKED_TAGS = ["script", "iframe", "object", "embed", "link", "meta", "base"];

export function sanitizeFragment(input: string): string {
  let output = input;

  for (const tag of BLOCKED_TAGS) {
    const fullTagPattern = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
    const selfClosingPattern = new RegExp(`<${tag}[^>]*\\/?\\s*>`, "gi");
    output = output.replace(fullTagPattern, "").replace(selfClosingPattern, "");
  }

  output = output.replace(/\son\w+\s*=\s*(["']).*?\1/gi, "");
  output = output.replace(/\son\w+\s*=\s*[^\s>]+/gi, "");
  output = output.replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');

  return output.trim();
}

export function buildPreviewDocument(html: string, css: string, js: string): string {
  const safeHtml = sanitizeFragment(html);
  const safeCss = sanitizeFragment(css);
  const safeJs = sanitizeFragment(js);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${safeCss}</style>
  </head>
  <body>
    ${safeHtml}
    <script>${safeJs}</script>
  </body>
</html>`;
}
