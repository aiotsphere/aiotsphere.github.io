'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, SectionHeading } from '@aiotsphere/ui';
import { useAuth } from '../providers';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginFormValues) {
    setError(null);
    setBusy(true);

    try {
      await auth.signInWithEmail(values.email, values.password);
    } catch (cause) {
      setError('Unable to sign in. Please check your credentials or verify your email.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <SectionHeading className="text-white">Member sign in</SectionHeading>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="space-y-6 p-8">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Secure access</p>
              <p className="text-slate-300">Sign in with email, Google, or Microsoft to access UTCC AIoT Sphere.</p>
            </div>

            {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div> : null}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <label className="grid gap-2 text-sm text-slate-200">
                Email
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  {...register('email')}
                />
                {errors.email ? <span className="text-xs text-rose-300">{errors.email.message}</span> : null}
              </label>

              <label className="grid gap-2 text-sm text-slate-200">
                Password
                <input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  {...register('password')}
                />
                {errors.password ? <span className="text-xs text-rose-300">{errors.password.message}</span> : null}
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" disabled={busy} className="w-full sm:w-auto">
                  {busy ? 'Signing in…' : 'Sign in'}
                </Button>
                <button
                  type="button"
                  className="text-sm text-cyan-300 underline-offset-4 transition hover:text-cyan-100"
                  onClick={() => auth.sendResetPassword(getValues('email'))}
                >
                  Forgot password?
                </button>
              </div>
            </form>

            <div className="border-t border-white/10 pt-5 text-sm text-slate-400">
              Don’t have an account? <Link href="/register" className="text-cyan-300 underline">Create one</Link>
            </div>
          </Card>

          <Card className="space-y-6 p-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Social sign-in</h2>
              <p className="text-slate-400">Fast login using your university or corporate identity provider.</p>
            </div>

            <div className="grid gap-3">
              <Button variant="secondary" onClick={() => auth.signInWithGoogle()} disabled={busy}>
                Continue with Google
              </Button>
              <Button variant="secondary" onClick={() => auth.signInWithMicrosoft()} disabled={busy}>
                Continue with Microsoft
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
