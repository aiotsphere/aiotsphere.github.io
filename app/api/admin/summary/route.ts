import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/adminAccess";
import { getCurrentUser, publicUser } from "@/lib/auth";
import { readStore } from "@/lib/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !(await isAdminEmail(user.email))) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const [users, progress, checkins, activityCodes] = await Promise.all([
    readStore("users"),
    readStore("progress"),
    readStore("checkins"),
    readStore("activityCodes")
  ]);
  return NextResponse.json({
    users: await Promise.all(users.map(publicUser)),
    progress,
    checkins,
    activityCodes
  });
}
