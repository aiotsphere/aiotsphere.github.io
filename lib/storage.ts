import { promises as fs } from "fs";
import path from "path";
import { isSupabaseStorageEnabled, readSupabaseStore, writeSupabaseStore } from "@/lib/supabaseStorage";
import type { ActivityCode, Checkin, ProgressRecord, User } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");

type StoreMap = {
  users: User[];
  progress: ProgressRecord[];
  activityCodes: ActivityCode[];
  checkins: Checkin[];
  adminEmails: string[];
};

const defaults: StoreMap = {
  users: [],
  progress: [],
  activityCodes: [],
  checkins: [],
  adminEmails: ["aiotsphere@utcc.ac.th"]
};

async function ensureDataFile<K extends keyof StoreMap>(name: K) {
  await fs.mkdir(dataDir, { recursive: true });
  const filePath = path.join(dataDir, `${name}.json`);
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaults[name], null, 2), "utf8");
  }
  return filePath;
}

export async function readStore<K extends keyof StoreMap>(name: K): Promise<StoreMap[K]> {
  if (isSupabaseStorageEnabled()) {
    return readSupabaseStore(name);
  }
  const filePath = await ensureDataFile(name);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw || "[]") as StoreMap[K];
}

export async function writeStore<K extends keyof StoreMap>(name: K, value: StoreMap[K]) {
  if (isSupabaseStorageEnabled()) {
    await writeSupabaseStore(name, value);
    return;
  }
  const filePath = await ensureDataFile(name);
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export async function updateStore<K extends keyof StoreMap>(name: K, updater: (value: StoreMap[K]) => StoreMap[K]) {
  const value = await readStore(name);
  const nextValue = updater(value);
  await writeStore(name, nextValue);
  return nextValue;
}
