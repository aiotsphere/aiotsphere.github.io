'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
  onAuthStateChanged,
  type Auth,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { appConfig } from '@aiotsphere/config';
import type { UserProfile, UserRole } from '@aiotsphere/types';

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let microsoftProvider: OAuthProvider | null = null;

function isBrowser() {
  return typeof window !== 'undefined';
}

function getFirebaseApp(): FirebaseApp {
  if (!isBrowser()) {
    throw new Error('Firebase auth module can only run in the browser.');
  }

  if (!firebaseApp) {
    firebaseApp = !getApps().length ? initializeApp(appConfig.firebase) : getApps()[0];
  }

  return firebaseApp;
}

function getAuthInstance(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }

  return auth;
}

function getFirestoreInstance(): Firestore {
  if (!firestore) {
    firestore = getFirestore(getFirebaseApp());
  }

  return firestore;
}

function getGoogleProvider(): GoogleAuthProvider {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
  }

  return googleProvider;
}

function getMicrosoftProvider(): OAuthProvider {
  if (!microsoftProvider) {
    microsoftProvider = new OAuthProvider('microsoft.com');
    microsoftProvider.setCustomParameters({ prompt: 'select_account' });
  }

  return microsoftProvider;
}

type AuthResult = {
  user: UserProfile | null;
};

function buildUserProfile(user: User, role: UserRole = 'member'): UserProfile {
  return {
    id: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? 'UTCC Member',
    role,
    locale: 'en',
    badges: [],
    xp: 0,
    level: 1,
    loyaltyPoints: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
}

async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(getFirestoreInstance(), 'users', uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}

async function createUserProfile(user: User, role: UserRole = 'member'): Promise<UserProfile> {
  const profile = buildUserProfile(user, role);
  const userRef = doc(getFirestoreInstance(), 'users', user.uid);

  await setDoc(
    userRef,
    {
      ...profile,
      updatedAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    },
    { merge: true },
  );

  return profile;
}

async function ensureUserProfile(user: User): Promise<UserProfile> {
  const existing = await fetchUserProfile(user.uid);
  if (existing) {
    return existing;
  }

  return createUserProfile(user, 'member');
}

function getFirebaseAuth(): Auth {
  return getAuthInstance();
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
  await sendEmailVerification(credential.user);
  const profile = await createUserProfile(credential.user, 'member');
  return { user: profile };
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);

  if (!credential.user.emailVerified) {
    await sendEmailVerification(credential.user);
    throw new Error('email-not-verified');
  }

  const profile = await ensureUserProfile(credential.user);
  return { user: profile };
}

export async function signInWithGoogle(): Promise<AuthResult> {
  const credential = await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
  const profile = await ensureUserProfile(credential.user);
  return { user: profile };
}

export async function signInWithMicrosoft(): Promise<AuthResult> {
  const credential = await signInWithPopup(getFirebaseAuth(), getMicrosoftProvider());
  const profile = await ensureUserProfile(credential.user);
  return { user: profile };
}

export async function sendResetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}

export async function signOutUser(): Promise<void> {
  await signOut(getFirebaseAuth());
}

export function onAuthStateChangedListener(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export { fetchUserProfile };
