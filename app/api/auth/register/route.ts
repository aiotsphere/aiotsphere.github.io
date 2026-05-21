import { NextResponse } from "next/server";
import { z } from "zod";
import { publicUser, registerForCamp, registerUser, setSession } from "@/lib/auth";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  school: z.string().min(2),
  educationLevel: z.enum(["มัธยมศึกษาตอนปลาย", "ปวช."])
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }
  try {
    const user = await registerUser(parsed.data);
    await registerForCamp(user.userId);
    await setSession(user);
    return NextResponse.json({ user: await publicUser(user) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "REGISTER_FAILED" }, { status: 400 });
  }
}
