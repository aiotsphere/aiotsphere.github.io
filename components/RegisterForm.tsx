"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  school: z.string().min(2),
  educationLevel: z.enum(["มัธยมศึกษาตอนปลาย", "ปวช."])
});

type RegisterValues = z.infer<typeof schema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { t, locale } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      educationLevel: "มัธยมศึกษาตอนปลาย"
    }
  });

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error === "EMAIL_EXISTS" ? "EMAIL_EXISTS" : "REGISTER_FAILED");
      }
      toast.success(t("forms.successRegister"));
      window.location.href = "/dashboard";
    } catch (error) {
      const message =
        error instanceof Error && error.message === "EMAIL_EXISTS"
          ? locale === "th"
            ? "อีเมลนี้มีอยู่ในระบบแล้ว"
            : "This email is already registered."
          : t("forms.required");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Field label={t("forms.firstName")} error={errors.firstName ? t("forms.required") : undefined}>
        <input className="input-cyber" placeholder={t("forms.firstName")} {...register("firstName")} />
      </Field>
      <Field label={t("forms.lastName")} error={errors.lastName ? t("forms.required") : undefined}>
        <input className="input-cyber" placeholder={t("forms.lastName")} {...register("lastName")} />
      </Field>
      <Field label={t("forms.email")} error={errors.email ? t("forms.required") : undefined}>
        <input className="input-cyber" type="email" placeholder="student@email.com" {...register("email")} />
      </Field>
      <Field label={t("forms.password")} error={errors.password ? t("forms.required") : undefined}>
        <input className="input-cyber" type="password" placeholder="••••••••" {...register("password")} />
      </Field>
      <Field label={t("forms.school")} error={errors.school ? t("forms.required") : undefined}>
        <input className="input-cyber" placeholder={t("forms.school")} {...register("school")} />
      </Field>
      <Field label={t("forms.educationLevel")} error={errors.educationLevel ? t("forms.required") : undefined}>
        <select className="input-cyber" {...register("educationLevel")}>
          <option>มัธยมศึกษาตอนปลาย</option>
          <option>ปวช.</option>
        </select>
      </Field>
      <div className="md:col-span-2">
        <CyberButton type="submit" className="mt-2 w-full py-4" disabled={loading}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          {t("forms.submitRegister")}
        </CyberButton>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs font-semibold text-fuchsia-300">{error}</span> : null}
    </label>
  );
}
