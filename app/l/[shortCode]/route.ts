import { NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";

interface RouteParams {
  params: Promise<{ shortCode: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { shortCode } = await params;
    const link = await getLinkByShortCode(shortCode);

    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    const url = link.url.startsWith("http") ? link.url : `https://${link.url}`;
    return NextResponse.redirect(url);
  } catch (err) {
    console.error("[redirect] error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
