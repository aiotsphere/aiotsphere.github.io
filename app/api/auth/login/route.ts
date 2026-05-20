import { NextResponse } from "next/server";
import { z } from "zod";
import { publicUser, setSession, verifyPassword } from "@/lib/auth";
import { readStore } from "@/lib/storage";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }
  const users = await readStore("users");
  const user = users.find((item) => item.email.toLowerCase() === parsed.data.email.toLowerCase());
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return NextResponse.json({ error: "INVALID_CREDENTIALS" }, { status: 401 });
  }
  await setSession(user);
  return NextResponse.json({ user: await publicUser(user) });
}
