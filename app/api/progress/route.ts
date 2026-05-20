import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readStore } from "@/lib/storage";
import { activities } from "@/lib/types";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  const progress = await readStore("progress");
  const record = progress.find((item) => item.userId === user.userId && item.trackId === user.interestedTrack);
  const trackActivities = activities.filter((activity) => activity.trackId === user.interestedTrack);
  const completedActivityIds = record?.completedActivityIds ?? [];
  const completed = trackActivities.filter((activity) => completedActivityIds.includes(activity.id));
  const percentage = trackActivities.length ? Math.round((completed.length / trackActivities.length) * 100) : 0;

  return NextResponse.json({
    user: { firstName: user.firstName, lastName: user.lastName, interestedTrack: user.interestedTrack },
    progress: {
      percentage,
      xp: record?.xp ?? 0,
      completedActivityIds,
      activities: trackActivities.map((activity, index) => ({
        ...activity,
        completed: completedActivityIds.includes(activity.id),
        locked: index > 0 && !completedActivityIds.includes(trackActivities[index - 1].id)
      }))
    }
  });
}
