import { readStore } from "@/lib/storage";
import type { User } from "@/lib/types";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getAdminEmails() {
  const fileEmails = await readStore("adminEmails");
  const envEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean);

  return [...new Set([...fileEmails.map(normalizeEmail), ...envEmails])];
}

export async function isAdminEmail(email: string) {
  const adminEmails = await getAdminEmails();
  return adminEmails.includes(normalizeEmail(email));
}

export async function getUserRole(user: Pick<User, "email">): Promise<User["role"]> {
  return (await isAdminEmail(user.email)) ? "admin" : "student";
}
