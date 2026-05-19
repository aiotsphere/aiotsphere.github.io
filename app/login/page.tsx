import { Suspense } from "react";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell title="เข้าสู่ระบบ" subtitle="กลับสู่ Dashboard ของ AI Builder Camp">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
