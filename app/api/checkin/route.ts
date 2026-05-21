import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { readStore, writeStore } from "@/lib/storage";
import { activities, aiBuilderCampId, tracks } from "@/lib/types";

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
  const campRegistrations = await readStore("campRegistrations");
  if (!campRegistrations.some((item) => item.userId === user.userId && item.campId === aiBuilderCampId && item.status !== "cancelled")) {
    return NextResponse.json({ error: "CAMP_NOT_REGISTERED" }, { status: 403 });
  }

  const codes = await readStore("activityCodes");
  const code = codes.find((item) => item.code === normalizedCode && item.active);
  if (!code || new Date(code.expiresAt).getTime() < Date.now() || code.usedCount >= code.maxUses) {
    return NextResponse.json({ error: "INVALID_CODE" }, { status: 400 });
  }
  const activity = activities.find((item) => item.id === code.activityId);
  const track = tracks.find((item) => item.id === code.trackId);
  if (!activity || !track) {
    return NextResponse.json({ error: "TRACK_NOT_FOUND" }, { status: 404 });
  }
  const checkins = await readStore("checkins");
  if (checkins.some((item) => item.userId === user.userId && item.trackId === track.id)) {
    return NextResponse.json({ error: "ALREADY_CHECKED_IN" }, { status: 409 });
  }

  const nextCheckins = [
    {
      id: randomUUID(),
      userId: user.userId,
      activityId: activity.id,
      code: normalizedCode,
      trackId: track.id,
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
  const existing = progress.find((item) => item.userId === user.userId && item.trackId === track.id);
  const nextProgress = existing
    ? progress.map((item) =>
        item.userId === user.userId && item.trackId === track.id
          ? {
              ...item,
              completedActivityIds: [...new Set([...item.completedActivityIds, activity.id])],
              xp: 0,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    : [
        {
          userId: user.userId,
          trackId: track.id,
          completedActivityIds: [activity.id],
          xp: 0,
          updatedAt: new Date().toISOString()
        },
        ...progress
      ];
  await writeStore("progress", nextProgress);

  const completedTrackIds = nextProgress.filter((item) => item.userId === user.userId && item.completedActivityIds.length > 0).map((item) => item.trackId);
  const completedCamp = tracks.every((item) => completedTrackIds.includes(item.id));
  if (completedCamp) {
    await writeStore(
      "campRegistrations",
      campRegistrations.map((item) =>
        item.userId === user.userId && item.campId === aiBuilderCampId
          ? { ...item, status: "completed", updatedAt: new Date().toISOString() }
          : item
      )
    );
  }

  return NextResponse.json({ ok: true, activity, track, completedCamp });
}
