import { NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
import { GeneratedProject } from "@/types/project";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      prompt?: string;
      instruction?: string;
      project?: GeneratedProject;
    };

    const prompt = body.prompt?.trim();
    const instruction = body.instruction?.trim();

    if (!prompt || !instruction || !body.project) {
      return NextResponse.json(
        { error: "Prompt, instruction and project are required." },
        { status: 400 },
      );
    }

    if (instruction.length > 800) {
      return NextResponse.json({ error: "Instruction is too long." }, { status: 400 });
    }

    const provider = getProvider();
    const project = await provider.edit({
      prompt,
      instruction,
      project: body.project,
    });

    return NextResponse.json({ project, provider: provider.name });
  } catch {
    return NextResponse.json({ error: "Could not edit website." }, { status: 500 });
  }
}
