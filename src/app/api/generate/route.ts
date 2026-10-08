import { NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string };
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (prompt.length > 1500) {
      return NextResponse.json({ error: "Prompt is too long." }, { status: 400 });
    }

    const provider = getProvider();
    const project = await provider.generate({ prompt });

    return NextResponse.json({ project, provider: provider.name });
  } catch {
    return NextResponse.json({ error: "Could not generate website." }, { status: 500 });
  }
}
