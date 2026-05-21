import { NextResponse } from "next/server";
import { getCurrentUser, registerForCamp } from "@/lib/auth";
import { aiBuilderCampId } from "@/lib/types";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const campRegistration = await registerForCamp(user.userId, aiBuilderCampId);
  return NextResponse.json({ campRegistration });
}
