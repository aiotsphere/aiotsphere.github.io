import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { readStore, writeStore } from "@/lib/storage";
import { activities } from "@/lib/types";

const schema = z.object({
  code: z.string().min(4)
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }
  const normalizedCode = parsed.data.code.trim().toUpperCase();
  const codes = await readStore("activityCodes");
  const code = codes.find((item) => item.code === normalizedCode && item.active);
  if (!code || new Date(code.expiresAt).getTime() < Date.now() || code.usedCount >= code.maxUses) {
    return NextResponse.json({ error: "INVALID_CODE" }, { status: 400 });
  }
  const activity = activities.find((item) => item.id === code.activityId);
  if (!activity) {
    return NextResponse.json({ error: "ACTIVITY_NOT_FOUND" }, { status: 404 });
  }
  const checkins = await readStore("checkins");
  if (checkins.some((item) => item.userId === user.userId && item.activityId === activity.id)) {
    return NextResponse.json({ error: "ALREADY_CHECKED_IN" }, { status: 409 });
  }

  const nextCheckins = [
    {
      id: randomUUID(),
      userId: user.userId,
      activityId: activity.id,
      code: normalizedCode,
      trackId: activity.trackId,
      createdAt: new Date().toISOString()
    },
    ...checkins
  ];
  await writeStore("checkins", nextCheckins);
  await writeStore(
    "activityCodes",
    codes.map((item) => (item.id === code.id ? { ...item, usedCount: item.usedCount + 1 } : item))
  );

  const progress = await readStore("progress");
  const existing = progress.find((item) => item.userId === user.userId && item.trackId === activity.trackId);
  const nextProgress = existing
    ? progress.map((item) =>
        item.userId === user.userId && item.trackId === activity.trackId
          ? {
              ...item,
              completedActivityIds: [...new Set([...item.completedActivityIds, activity.id])],
              xp: item.completedActivityIds.includes(activity.id) ? item.xp : item.xp + activity.xp,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    : [
        {
          userId: user.userId,
          trackId: activity.trackId,
          completedActivityIds: [activity.id],
          xp: activity.xp,
          updatedAt: new Date().toISOString()
        },
        ...progress
      ];
  await writeStore("progress", nextProgress);

  return NextResponse.json({ ok: true, activity });
}
