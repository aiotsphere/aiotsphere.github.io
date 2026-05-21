"use client";

import { activities, aiBuilderCampId, tracks } from "@/lib/types";
import type { ActivityCode, CampRegistration, Checkin, ProgressRecord, User } from "@/lib/types";

const keys = {
  users: "aiot.static.users",
  campRegistrations: "aiot.static.campRegistrations",
  progress: "aiot.static.progress",
  activityCodes: "aiot.static.activityCodes",
  checkins: "aiot.static.checkins",
  session: "aiot.static.session"
};

const adminEmails = ["aiotsphere@utcc.ac.th"];

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  school: string;
  educationLevel: string;
};

type LoginInput = {
  email: string;
  password: string;
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("aiot-store-change"));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function makeId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function hashPassword(password: string) {
  const encoded = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function isAdminEmail(email: string) {
  return adminEmails.includes(normalizeEmail(email));
}

export function getUsers() {
  return readJson<User[]>(keys.users, []);
}

export function getCampRegistrations() {
  return readJson<CampRegistration[]>(keys.campRegistrations, []);
}

export function getProgressRecords() {
  return readJson<ProgressRecord[]>(keys.progress, []);
}

export function getActivityCodes() {
  return readJson<ActivityCode[]>(keys.activityCodes, []);
}

export function getCheckins() {
  return readJson<Checkin[]>(keys.checkins, []);
}

export function getCurrentUser() {
  const userId = typeof window === "undefined" ? null : window.localStorage.getItem(keys.session);
  if (!userId) return null;
  return getUsers().find((user) => user.userId === userId) ?? null;
}

export async function registerMembership(input: RegisterInput) {
  const users = getUsers();
  const email = normalizeEmail(input.email);
  if (users.some((user) => normalizeEmail(user.email) === email)) {
    throw new Error("EMAIL_EXISTS");
  }

  const now = new Date().toISOString();
  const user: User = {
    id: makeId(),
    userId: makeId(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email,
    passwordHash: await hashPassword(input.password),
    school: input.school.trim(),
    educationLevel: input.educationLevel,
    status: "pending",
    role: isAdminEmail(email) ? "admin" : "student",
    createdAt: now
  };

  writeJson(keys.users, [user, ...users]);
  registerForCamp(user.userId);
  window.localStorage.setItem(keys.session, user.userId);
  window.dispatchEvent(new Event("aiot-store-change"));
  return user;
}

export async function login(input: LoginInput) {
  const user = getUsers().find((item) => normalizeEmail(item.email) === normalizeEmail(input.email));
  if (!user || user.passwordHash !== (await hashPassword(input.password))) {
    throw new Error("INVALID_CREDENTIALS");
  }
  window.localStorage.setItem(keys.session, user.userId);
  window.dispatchEvent(new Event("aiot-store-change"));
  return user;
}

export function logout() {
  window.localStorage.removeItem(keys.session);
  window.dispatchEvent(new Event("aiot-store-change"));
}

export function registerForCamp(userId: string) {
  const registrations = getCampRegistrations();
  const existing = registrations.find((item) => item.userId === userId && item.campId === aiBuilderCampId);
  if (existing) return existing;

  const now = new Date().toISOString();
  const registration: CampRegistration = {
    id: makeId(),
    userId,
    campId: aiBuilderCampId,
    status: "registered",
    createdAt: now,
    updatedAt: now
  };
  writeJson(keys.campRegistrations, [registration, ...registrations]);
  return registration;
}

export function createActivityCode(activityId: string, maxUses = 80, expiresInHours = 24) {
  const user = getCurrentUser();
  if (!user || !isAdminEmail(user.email)) throw new Error("FORBIDDEN");

  const activity = activities.find((item) => item.id === activityId);
  if (!activity) throw new Error("ACTIVITY_NOT_FOUND");

  const codes = getActivityCodes();
  let code = `AIOT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  while (codes.some((item) => item.code === code)) {
    code = `AIOT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  }

  const activityCode: ActivityCode = {
    id: makeId(),
    code,
    activityId,
    trackId: activity.trackId,
    createdBy: user.userId,
    expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString(),
    maxUses,
    usedCount: 0,
    active: true,
    createdAt: new Date().toISOString()
  };
  writeJson(keys.activityCodes, [activityCode, ...codes]);
  return activityCode;
}

export function claimBadge(rawCode: string) {
  const user = getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");

  const registration = getCampRegistrations().find((item) => item.userId === user.userId && item.campId === aiBuilderCampId && item.status !== "cancelled");
  if (!registration) throw new Error("CAMP_NOT_REGISTERED");

  const codeValue = rawCode.trim().toUpperCase();
  const codes = getActivityCodes();
  const code = codes.find((item) => item.code === codeValue && item.active);
  if (!code || new Date(code.expiresAt).getTime() < Date.now() || code.usedCount >= code.maxUses) {
    throw new Error("INVALID_CODE");
  }

  const activity = activities.find((item) => item.id === code.activityId);
  if (!activity) throw new Error("ACTIVITY_NOT_FOUND");

  const checkins = getCheckins();
  if (checkins.some((item) => item.userId === user.userId && item.trackId === code.trackId)) {
    throw new Error("ALREADY_CHECKED_IN");
  }

  writeJson(keys.checkins, [
    {
      id: makeId(),
      userId: user.userId,
      activityId: activity.id,
      code: codeValue,
      trackId: code.trackId,
      createdAt: new Date().toISOString()
    },
    ...checkins
  ]);

  writeJson(
    keys.activityCodes,
    codes.map((item) => (item.id === code.id ? { ...item, usedCount: item.usedCount + 1 } : item))
  );

  const progress = getProgressRecords();
  const existing = progress.find((item) => item.userId === user.userId && item.trackId === code.trackId);
  const nextProgress = existing
    ? progress.map((item) =>
        item.userId === user.userId && item.trackId === code.trackId
          ? {
              ...item,
              completedActivityIds: [...new Set([...item.completedActivityIds, activity.id])],
              updatedAt: new Date().toISOString()
            }
          : item
      )
    : [
        {
          userId: user.userId,
          trackId: code.trackId,
          completedActivityIds: [activity.id],
          xp: 0,
          updatedAt: new Date().toISOString()
        },
        ...progress
      ];
  writeJson(keys.progress, nextProgress);

  const completedTrackIds = nextProgress.filter((item) => item.userId === user.userId && item.completedActivityIds.length > 0).map((item) => item.trackId);
  if (tracks.every((track) => completedTrackIds.includes(track.id))) {
    writeJson(
      keys.campRegistrations,
      getCampRegistrations().map((item) =>
        item.id === registration.id ? { ...item, status: "completed", updatedAt: new Date().toISOString() } : item
      )
    );
  }

  return { activity, track: tracks.find((item) => item.id === code.trackId), completedCamp: tracks.every((track) => completedTrackIds.includes(track.id)) };
}

export function getBadgeProgress(userId: string) {
  const progress = getProgressRecords();
  const trackProgress = tracks.map((track) => {
    const record = progress.find((item) => item.userId === userId && item.trackId === track.id);
    const activity = activities.find((item) => item.trackId === track.id);
    const completed = Boolean(activity && record?.completedActivityIds.includes(activity.id));
    return { ...track, trackId: track.id, completed, completedActivityIds: record?.completedActivityIds ?? [], updatedAt: record?.updatedAt ?? null };
  });
  const completedTrackIds = trackProgress.filter((item) => item.completed).map((item) => item.trackId);
  return {
    percentage: Math.round((completedTrackIds.length / tracks.length) * 100),
    completedTrackIds,
    completedBadges: completedTrackIds.length,
    totalBadges: tracks.length,
    campBadgeEarned: completedTrackIds.length === tracks.length,
    tracks: trackProgress
  };
}

export function getAdminSummary() {
  return {
    users: getUsers().map((user) => ({ ...user, passwordHash: "" })),
    campRegistrations: getCampRegistrations(),
    progress: getProgressRecords(),
    checkins: getCheckins(),
    activityCodes: getActivityCodes()
  };
}
