import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readStore } from "@/lib/storage";
import { activities, aiBuilderCampId, tracks } from "@/lib/types";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const [progress, campRegistrations] = await Promise.all([readStore("progress"), readStore("campRegistrations")]);
  const campRegistration = campRegistrations.find((item) => item.userId === user.userId && item.campId === aiBuilderCampId);
  const trackProgress = tracks.map((track) => {
    const record = progress.find((item) => item.userId === user.userId && item.trackId === track.id);
    const activity = activities.find((item) => item.trackId === track.id);
    const completed = Boolean(activity && record?.completedActivityIds.includes(activity.id));

    return {
      trackId: track.id,
      title: track.title,
      titleTh: track.titleTh,
      subtitle: track.subtitle,
      subtitleTh: track.subtitleTh,
      description: track.description,
      descriptionTh: track.descriptionTh,
      completed,
      completedActivityIds: record?.completedActivityIds ?? [],
      updatedAt: record?.updatedAt ?? null
    };
  });
  const completedTrackIds = trackProgress.filter((item) => item.completed).map((item) => item.trackId);
  const percentage = Math.round((completedTrackIds.length / tracks.length) * 100);

  return NextResponse.json({
    user: { firstName: user.firstName, lastName: user.lastName },
    campRegistration,
    progress: {
      percentage,
      completedTrackIds,
      completedBadges: completedTrackIds.length,
      totalBadges: tracks.length,
      campBadgeEarned: completedTrackIds.length === tracks.length,
      tracks: trackProgress
    }
  });
}
