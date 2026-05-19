import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";
import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell title="สมัครเข้าร่วมค่าย" subtitle="AI Builder Camp 2026: Pathway to AI Engineer">
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-silver">
        มีบัญชีแล้ว? <Link href="/login" className="font-bold text-cyan">เข้าสู่ระบบ</Link>
      </p>
    </AuthShell>
  );
}
