"use client";

import { Suspense } from "react";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/LoginForm";
import { useI18n } from "@/lib/i18n";

export default function CampLoginPage() {
  const { t, tl } = useI18n();
  return (
    <AuthShell
      title={t("forms.submitLogin")}
      subtitle={tl({ th: "เข้าสู่ระบบ AIoT Sphere Laboratory", en: "Access AIoT Sphere Laboratory", zh: "访问 AIoT Sphere 实验室" })}
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
