import { NextResponse } from "next/server";
import { createProjectZip } from "@/lib/export/zip";
import { GeneratedProject } from "@/types/project";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { project?: GeneratedProject };

    if (!body.project) {
      return NextResponse.json({ error: "Project is required." }, { status: 400 });
    }

    const zip = await createProjectZip(body.project);

    return new NextResponse(new Uint8Array(zip), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="webforge-project.zip"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not export project." }, { status: 500 });
  }
}
