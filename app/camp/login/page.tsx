"use client";

import { Suspense } from "react";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/LoginForm";
import { useI18n } from "@/lib/i18n";

export default function CampLoginPage() {
  const { t, locale } = useI18n();
  return (
    <AuthShell
      title={t("forms.submitLogin")}
      subtitle={locale === "th" ? "เข้าสู่ระบบ AIoT Sphere Laboratory" : "Access AIoT Sphere Laboratory"}
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
