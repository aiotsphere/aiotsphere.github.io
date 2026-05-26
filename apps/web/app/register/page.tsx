'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, SectionHeading } from '@aiotsphere/ui';
import { useAuth } from '../providers';

const registrationSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8),
});

type RegisterFormValues = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(values: RegisterFormValues) {
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setBusy(true);

    try {
      await auth.signUpWithEmail(values.email, values.password);
    } catch (cause) {
      setError('Unable to register. Please verify your email and password rules.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <SectionHeading className="text-white">Create your UTCC account</SectionHeading>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="space-y-6 p-8">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">New member registration</p>
              <p className="text-slate-300">Register with your email and receive a verification link before you access event applications.</p>
            </div>

            {error ? <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div> : null}

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

              <label className="grid gap-2 text-sm text-slate-200">
                Confirm password
                <input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword ? <span className="text-xs text-rose-300">{errors.confirmPassword.message}</span> : null}
              </label>

              <Button type="submit" disabled={busy} className="w-full">
                {busy ? 'Creating account…' : 'Register now'}
              </Button>
            </form>

            <div className="border-t border-white/10 pt-5 text-sm text-slate-400">
              Already registered? <Link href="/login" className="text-cyan-300 underline">Sign in</Link>
            </div>
          </Card>

          <Card className="space-y-6 p-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Trust and verification</h2>
              <p className="text-slate-400">All new registrations require email verification before access to member-only features.</p>
            </div>

            <div className="grid gap-3">
              <Button variant="secondary" onClick={() => auth.signInWithGoogle()} disabled={busy}>
                Register with Google
              </Button>
              <Button variant="secondary" onClick={() => auth.signInWithMicrosoft()} disabled={busy}>
                Register with Microsoft
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
