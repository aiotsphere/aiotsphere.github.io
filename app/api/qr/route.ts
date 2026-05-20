import { NextResponse } from "next/server";
import { createQrDataUrl } from "@/lib/qr";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const target = url.searchParams.get("url") ?? `${url.origin}/register`;
  const qr = await createQrDataUrl(target);
  return NextResponse.json({ qr, target });
}
