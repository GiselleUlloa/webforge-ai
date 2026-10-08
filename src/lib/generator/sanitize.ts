const BLOCKED_TAGS = ["script", "iframe", "object", "embed", "link", "meta", "base"];

function stripTagContent(source: string, tag: string): string {
  let value = source;
  const openToken = `<${tag}`;
  const closeToken = `</${tag}>`;

  while (true) {
    const openIndex = value.toLowerCase().indexOf(openToken);
    if (openIndex === -1) {
      break;
    }

    const closeIndex = value.toLowerCase().indexOf(closeToken, openIndex);
    if (closeIndex === -1) {
      const endOpenTag = value.indexOf(">", openIndex);
      if (endOpenTag === -1) {
        value = value.slice(0, openIndex);
      } else {
        value = value.slice(0, openIndex) + value.slice(endOpenTag + 1);
      }
      continue;
    }

    const removalEnd = closeIndex + closeToken.length;
    value = value.slice(0, openIndex) + value.slice(removalEnd);
  }

  return value;
}

export function sanitizeFragment(input: string): string {
  let output = input;

  for (const tag of BLOCKED_TAGS) {
    output = stripTagContent(output, tag);
  }

  output = output.replaceAll("javascript:", "").replaceAll("JAVASCRIPT:", "");

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
