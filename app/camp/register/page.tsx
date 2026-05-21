"use client";

import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";
import { RegisterForm } from "@/components/RegisterForm";
import { useI18n } from "@/lib/i18n";

export default function CampRegisterPage() {
  const { t } = useI18n();
  return (
    <AuthShell title={t("camp.registration")} subtitle="AI Builder Camp 2026 | AIoT Sphere Laboratory">
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-silver">
        {t("forms.already")}{" "}
        <Link href="/camp/login" className="font-bold text-cyan">
          {t("forms.submitLogin")}
        </Link>
      </p>
    </AuthShell>
  );
}
