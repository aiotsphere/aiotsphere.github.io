import type { ActivityCode, CampRegistration, Checkin, ProgressRecord, User } from "@/lib/types";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

type StoreMap = {
  users: User[];
  campRegistrations: CampRegistration[];
  progress: ProgressRecord[];
  activityCodes: ActivityCode[];
  checkins: Checkin[];
  adminEmails: string[];
};

type TableName = keyof StoreMap;

const tables: Record<TableName, string> = {
  users: "app_users",
  campRegistrations: "app_camp_registrations",
  progress: "app_progress",
  activityCodes: "app_activity_codes",
  checkins: "app_checkins",
  adminEmails: "app_admin_emails"
};

function toSnake(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`), item])
  );
}

function userFromRow(row: Record<string, unknown>): User {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    email: String(row.email),
    passwordHash: String(row.password_hash),
    school: String(row.school),
    educationLevel: String(row.education_level),
    status: row.status as User["status"],
    role: row.role as User["role"],
    createdAt: String(row.created_at)
  };
}

function campRegistrationFromRow(row: Record<string, unknown>): CampRegistration {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    campId: row.camp_id as CampRegistration["campId"],
    status: row.status as CampRegistration["status"],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at)
  };
}

function progressFromRow(row: Record<string, unknown>): ProgressRecord {
  return {
    userId: String(row.user_id),
    trackId: row.track_id as ProgressRecord["trackId"],
    completedActivityIds: Array.isArray(row.completed_activity_ids) ? (row.completed_activity_ids as string[]) : [],
    xp: Number(row.xp ?? 0),
    updatedAt: String(row.updated_at)
  };
}

function activityCodeFromRow(row: Record<string, unknown>): ActivityCode {
  return {
    id: String(row.id),
    code: String(row.code),
    activityId: String(row.activity_id),
    trackId: row.track_id as ActivityCode["trackId"],
    createdBy: String(row.created_by),
    expiresAt: String(row.expires_at),
    maxUses: Number(row.max_uses ?? 0),
    usedCount: Number(row.used_count ?? 0),
    active: Boolean(row.active),
    createdAt: String(row.created_at)
  };
}

function checkinFromRow(row: Record<string, unknown>): Checkin {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    activityId: String(row.activity_id),
    code: String(row.code),
    trackId: row.track_id as Checkin["trackId"],
    createdAt: String(row.created_at)
  };
}

function fromRows<K extends TableName>(name: K, rows: Record<string, unknown>[]): StoreMap[K] {
  if (name === "users") return rows.map(userFromRow) as StoreMap[K];
  if (name === "campRegistrations") return rows.map(campRegistrationFromRow) as StoreMap[K];
  if (name === "progress") return rows.map(progressFromRow) as StoreMap[K];
  if (name === "activityCodes") return rows.map(activityCodeFromRow) as StoreMap[K];
  if (name === "checkins") return rows.map(checkinFromRow) as StoreMap[K];
  return rows.map((row) => String(row.email)) as StoreMap[K];
}

function toRows<K extends TableName>(name: K, value: StoreMap[K]) {
  if (name === "adminEmails") {
    return (value as string[]).map((email) => ({ email: email.trim().toLowerCase() }));
  }
  return (value as Array<Record<string, unknown>>).map(toSnake);
}

export function isSupabaseStorageEnabled() {
  return Boolean(getSupabaseAdminClient());
}

export async function readSupabaseStore<K extends TableName>(name: K): Promise<StoreMap[K]> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) throw new Error("SUPABASE_NOT_CONFIGURED");

  const { data, error } = await supabase.from(tables[name]).select("*");
  if (error) throw error;
  return fromRows(name, (data ?? []) as Record<string, unknown>[]);
}

export async function writeSupabaseStore<K extends TableName>(name: K, value: StoreMap[K]) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) throw new Error("SUPABASE_NOT_CONFIGURED");

  const table = tables[name];
  const { error: deleteError } = await supabase.from(table).delete().neq(name === "adminEmails" ? "email" : "id", "__never__");
  if (deleteError) throw deleteError;

  const rows = toRows(name, value);
  if (rows.length === 0) return;

  const { error: insertError } = await supabase.from(table).insert(rows);
  if (insertError) throw insertError;
}
