import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from './providers';

export const metadata = {
  title: 'UTCC AIoT Sphere',
  description: 'AI-powered event and education ecosystem for UTCC Engineering',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
