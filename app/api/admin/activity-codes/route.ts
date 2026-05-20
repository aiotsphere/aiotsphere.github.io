import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail } from "@/lib/adminAccess";
import { getCurrentUser } from "@/lib/auth";
import { readStore, writeStore } from "@/lib/storage";
import { activities } from "@/lib/types";

const schema = z.object({
  activityId: z.string().min(1),
  maxUses: z.coerce.number().min(1).max(500),
  expiresInHours: z.coerce.number().min(1).max(720)
});

function makeCode() {
  return `AIOT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || !(await isAdminEmail(user.email))) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }
  const activity = activities.find((item) => item.id === parsed.data.activityId);
  if (!activity) {
    return NextResponse.json({ error: "ACTIVITY_NOT_FOUND" }, { status: 404 });
  }
  const codes = await readStore("activityCodes");
  let code = makeCode();
  while (codes.some((item) => item.code === code)) code = makeCode();
  const activityCode = {
    id: randomUUID(),
    code,
    activityId: activity.id,
    trackId: activity.trackId,
    createdBy: user.userId,
    expiresAt: new Date(Date.now() + parsed.data.expiresInHours * 60 * 60 * 1000).toISOString(),
    maxUses: parsed.data.maxUses,
    usedCount: 0,
    active: true,
    createdAt: new Date().toISOString()
  };
  await writeStore("activityCodes", [activityCode, ...codes]);
  return NextResponse.json({ activityCode });
}
