"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CyberButton } from "@/components/ui/Button";
import { login } from "@/lib/clientStore";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectedFrom") ?? "/camp/progress";
  const { t, tl } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    try {
      await login(values);
      toast.success(t("forms.successLogin"));
      window.location.href = redirect;
    } catch {
      toast.error(tl({ th: "อีเมลหรือรหัสผ่านไม่ถูกต้อง", en: "Invalid email or password.", zh: "电子邮件或密码不正确。" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white">{t("forms.email")}</span>
        <input className="input-cyber" type="email" placeholder="student@email.com" {...register("email")} />
        {errors.email ? <span className="mt-2 block text-xs text-fuchsia-300">{t("forms.required")}</span> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white">{t("forms.password")}</span>
        <input className="input-cyber" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password ? <span className="mt-2 block text-xs text-fuchsia-300">{t("forms.required")}</span> : null}
      </label>
      <CyberButton type="submit" className="w-full py-4" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
        {t("forms.submitLogin")}
      </CyberButton>
      <p className="text-center text-sm text-silver">
        {t("forms.noAccount")}{" "}
        <Link href="/camp/register" className="font-bold text-cyan">
          {t("forms.submitRegister")}
        </Link>
      </p>
    </form>
  );
}
