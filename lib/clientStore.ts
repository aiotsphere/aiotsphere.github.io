"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebaseClient";
import { activities, aiBuilderCampId, tracks } from "@/lib/types";
import type { ActivityCode, CampRegistration, Checkin, ProgressRecord, User } from "@/lib/types";

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

type AdminSummary = {
  users: Array<Omit<User, "passwordHash"> & { passwordHash?: string }>;
  campRegistrations: CampRegistration[];
  progress: ProgressRecord[];
  checkins: Checkin[];
  activityCodes: ActivityCode[];
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function clean<T extends Record<string, unknown>>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function isAdminEmail(email: string) {
  return adminEmails.includes(normalizeEmail(email));
}

function requireFirebase() {
  if (!isFirebaseConfigured()) {
    throw new Error("FIREBASE_NOT_CONFIGURED");
  }
}

function toUser(authUser: FirebaseUser, data: Record<string, unknown>): User {
  return {
    id: String(data.id ?? authUser.uid),
    userId: String(data.userId ?? authUser.uid),
    firstName: String(data.firstName ?? ""),
    lastName: String(data.lastName ?? ""),
    email: normalizeEmail(String(data.email ?? authUser.email ?? "")),
    passwordHash: "",
    school: String(data.school ?? ""),
    educationLevel: String(data.educationLevel ?? ""),
    status: (data.status as User["status"]) ?? "pending",
    role: isAdminEmail(String(data.email ?? authUser.email ?? "")) ? "admin" : "student",
    createdAt: String(data.createdAt ?? new Date().toISOString())
  };
}

function currentFirebaseUser() {
  requireFirebase();
  return new Promise<FirebaseUser | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getCurrentUser() {
  const authUser = await currentFirebaseUser();
  if (!authUser) return null;
  const snapshot = await getDoc(doc(getFirebaseDb(), "users", authUser.uid));
  if (!snapshot.exists()) return null;
  return toUser(authUser, snapshot.data());
}

export async function registerMembership(input: RegisterInput) {
  requireFirebase();
  const email = normalizeEmail(input.email);
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, input.password);
  await updateProfile(credential.user, { displayName: `${input.firstName.trim()} ${input.lastName.trim()}` });

  const now = new Date().toISOString();
  const user: User = {
    id: credential.user.uid,
    userId: credential.user.uid,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email,
    passwordHash: "",
    school: input.school.trim(),
    educationLevel: input.educationLevel,
    status: "pending",
    role: isAdminEmail(email) ? "admin" : "student",
    createdAt: now
  };

  await setDoc(doc(getFirebaseDb(), "users", credential.user.uid), clean(user));
  
  // Small delay to ensure auth state is settled before writing to campRegistrations
  await new Promise(resolve => setTimeout(resolve, 100));
  
  await registerForCamp(credential.user.uid);
  window.dispatchEvent(new Event("aiot-store-change"));
  return user;
}

export async function login(input: LoginInput) {
  requireFirebase();
  const credential = await signInWithEmailAndPassword(getFirebaseAuth(), normalizeEmail(input.email), input.password);
  window.dispatchEvent(new Event("aiot-store-change"));
  return getCurrentUserForAuth(credential.user);
}

async function getCurrentUserForAuth(authUser: FirebaseUser) {
  const snapshot = await getDoc(doc(getFirebaseDb(), "users", authUser.uid));
  if (!snapshot.exists()) return null;
  return toUser(authUser, snapshot.data());
}

export async function logout() {
  requireFirebase();
  await signOut(getFirebaseAuth());
  window.dispatchEvent(new Event("aiot-store-change"));
}

export async function registerForCamp(userId: string) {
  requireFirebase();
  const registrationId = `${userId}_${aiBuilderCampId}`;
  const registrationRef = doc(getFirebaseDb(), "campRegistrations", registrationId);
  const snapshot = await getDoc(registrationRef);
  if (snapshot.exists()) return snapshot.data() as CampRegistration;

  const now = new Date().toISOString();
  const registration: CampRegistration = {
    id: registrationId,
    userId,
    campId: aiBuilderCampId,
    status: "registered",
    createdAt: now,
    updatedAt: now
  };
  await setDoc(registrationRef, clean(registration));
  return registration;
}

export async function createActivityCode(activityId: string, maxUses = 80, expiresInHours = 24) {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) throw new Error("FORBIDDEN");

  const activity = activities.find((item) => item.id === activityId);
  if (!activity) throw new Error("ACTIVITY_NOT_FOUND");

  const code = `AIOT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const activityCode: ActivityCode = {
    id: code,
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

  await setDoc(doc(getFirebaseDb(), "activityCodes", activityCode.id), clean(activityCode));
  window.dispatchEvent(new Event("aiot-store-change"));
  return activityCode;
}

export async function claimBadge(rawCode: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");

  const registrationId = `${user.userId}_${aiBuilderCampId}`;
  const registrationRef = doc(getFirebaseDb(), "campRegistrations", registrationId);
  const registrationSnapshot = await getDoc(registrationRef);
  if (!registrationSnapshot.exists()) throw new Error("CAMP_NOT_REGISTERED");

  const codeValue = rawCode.trim().toUpperCase();
  const codeRef = doc(getFirebaseDb(), "activityCodes", codeValue);
  const codeSnapshot = await getDoc(codeRef);
  if (!codeSnapshot.exists()) throw new Error("INVALID_CODE");

  const code = codeSnapshot.data() as ActivityCode;
  if (!code.active || new Date(code.expiresAt).getTime() < Date.now() || code.usedCount >= code.maxUses) {
    throw new Error("INVALID_CODE");
  }

  const activity = activities.find((item) => item.id === code.activityId);
  if (!activity) throw new Error("ACTIVITY_NOT_FOUND");

  const checkinId = `${user.userId}_${code.trackId}`;
  const checkinRef = doc(getFirebaseDb(), "checkins", checkinId);
  const progressRef = doc(getFirebaseDb(), "progress", checkinId);

  await runTransaction(getFirebaseDb(), async (transaction) => {
    const checkinSnapshot = await transaction.get(checkinRef);
    if (checkinSnapshot.exists()) throw new Error("ALREADY_CHECKED_IN");

    transaction.set(checkinRef, {
      id: checkinId,
      userId: user.userId,
      activityId: activity.id,
      code: codeValue,
      trackId: code.trackId,
      createdAt: new Date().toISOString()
    } satisfies Checkin);
    transaction.set(progressRef, {
      userId: user.userId,
      trackId: code.trackId,
      completedActivityIds: [activity.id],
      xp: 0,
      updatedAt: new Date().toISOString()
    } satisfies ProgressRecord);
    transaction.update(codeRef, { usedCount: increment(1) });
  });

  const progress = await getUserProgressRecords(user.userId);
  const completedTrackIds = progress.filter((item) => item.completedActivityIds.length > 0).map((item) => item.trackId);
  if (tracks.every((track) => completedTrackIds.includes(track.id))) {
    await updateDoc(registrationRef, { status: "completed", updatedAt: new Date().toISOString() });
  }

  window.dispatchEvent(new Event("aiot-store-change"));
  return { activity, track: tracks.find((item) => item.id === code.trackId), completedCamp: tracks.every((track) => completedTrackIds.includes(track.id)) };
}

async function getUserProgressRecords(userId: string) {
  const snapshot = await getDocs(query(collection(getFirebaseDb(), "progress"), where("userId", "==", userId)));
  return snapshot.docs.map((item) => item.data() as ProgressRecord);
}

export async function getBadgeProgress(userId: string) {
  const progress = await getUserProgressRecords(userId);
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

async function getCollection<T>(name: string) {
  const snapshot = await getDocs(collection(getFirebaseDb(), name));
  return snapshot.docs.map((item) => item.data() as T);
}

export async function getAdminSummary(): Promise<AdminSummary> {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) throw new Error("FORBIDDEN");

  const [users, campRegistrations, progress, checkins, activityCodes] = await Promise.all([
    getCollection<User>("users"),
    getCollection<CampRegistration>("campRegistrations"),
    getCollection<ProgressRecord>("progress"),
    getCollection<Checkin>("checkins"),
    getCollection<ActivityCode>("activityCodes")
  ]);

  return {
    users: users.map((item) => ({ ...item, passwordHash: "" })),
    campRegistrations,
    progress,
    checkins,
    activityCodes
  };
}
