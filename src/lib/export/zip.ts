import JSZip from "jszip";
import { GeneratedProject } from "@/types/project";

export async function createProjectZip(project: GeneratedProject): Promise<Buffer> {
  const zip = new JSZip();
  const projectName = project.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-") || "webforge-site";

  zip.file(
    `${projectName}/index.html`,
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
${project.html}
    <script src="script.js"></script>
  </body>
</html>`,
  );

  zip.file(`${projectName}/styles.css`, project.css);
  zip.file(`${projectName}/script.js`, project.js);

  return zip.generateAsync({ type: "nodebuffer" });
}
