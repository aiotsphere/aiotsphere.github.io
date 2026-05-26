import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'UTCC AIoT Sphere Admin',
  description: 'Administrator dashboard for UTCC AIoT Sphere',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">{children}</body>
    </html>
  );
}
