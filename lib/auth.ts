import { cookies } from "next/headers";
import { createHash, randomBytes, randomUUID, timingSafeEqual } from "crypto";
import { getUserRole } from "@/lib/adminAccess";
import { readStore, writeStore } from "@/lib/storage";
import type { Registration, TrackId, User } from "@/lib/types";

export const sessionCookieName = "aiot_session";

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = createHash("sha256").update(`${salt}:${password}`).digest("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const incoming = hashPassword(password, salt).split(":")[1];
  return timingSafeEqual(Buffer.from(hash), Buffer.from(incoming));
}

export async function publicUser(user: User): Promise<Registration & { role: User["role"] }> {
  const { passwordHash: _passwordHash, role: _storedRole, ...registration } = user;
  return { ...registration, role: await getUserRole(user) };
}

export async function registerUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  school: string;
  educationLevel: string;
  interestedTrack: TrackId;
  discordUsername: string;
}) {
  const users = await readStore("users");
  const normalizedEmail = input.email.trim().toLowerCase();
  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error("EMAIL_EXISTS");
  }
  const user: User = {
    id: randomUUID(),
    userId: randomUUID(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(input.password),
    school: input.school.trim(),
    educationLevel: input.educationLevel,
    interestedTrack: input.interestedTrack,
    discordUsername: input.discordUsername.trim(),
    status: "pending",
    role: "student",
    createdAt: new Date().toISOString()
  };
  await writeStore("users", [user, ...users]);
  return user;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(sessionCookieName)?.value;
  if (!userId) return null;
  const users = await readStore("users");
  return users.find((user) => user.userId === userId) ?? null;
}

export async function setSession(user: User) {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, user.userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}
