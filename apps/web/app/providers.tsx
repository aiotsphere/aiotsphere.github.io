'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from 'firebase/auth';
import {
  onAuthStateChangedListener,
  signOutUser,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithMicrosoft,
  sendResetPassword,
  fetchUserProfile,
} from '@aiotsphere/lib/src/auth';
import type { UserProfile } from '@aiotsphere/types';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  sendResetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (firebaseUser: User | null) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const storedUser = await fetchUserProfile(firebaseUser.uid);
      setUser(storedUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signInWithEmail: async (email: string, password: string) => {
        await signInWithEmail(email, password);
      },
      signUpWithEmail: async (email: string, password: string) => {
        await signUpWithEmail(email, password);
      },
      signInWithGoogle: async () => {
        await signInWithGoogle();
      },
      signInWithMicrosoft: async () => {
        await signInWithMicrosoft();
      },
      sendResetPassword: async (email: string) => {
        await sendResetPassword(email);
      },
      signOut: async () => {
        await signOutUser();
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export { useAuthContext as useAuth };
