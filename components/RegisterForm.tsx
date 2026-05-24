"use client";

import { FirebaseError } from "firebase/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CyberButton } from "@/components/ui/Button";
import { registerMembership } from "@/lib/clientStore";
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
  const { t, tl } = useI18n();
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
      await registerMembership(values);
      toast.success(t("forms.successRegister"));
      window.location.href = "/camp/progress";
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? error.code === "auth/email-already-in-use"
            ? tl({
                th: "อีเมลนี้มีอยู่ในระบบแล้ว",
                en: "This email is already registered.",
                zh: "此电子邮件已注册。"
              })
            : error.code === "auth/invalid-email"
            ? tl({
                th: "รูปแบบอีเมลไม่ถูกต้อง",
                en: "Invalid email format.",
                zh: "电子邮件格式无效。"
              })
            : error.code === "auth/weak-password"
            ? tl({
                th: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                en: "Password must be at least 6 characters.",
                zh: "密码长度至少为 6 个字符。"
              })
            : error.message
          : error instanceof Error
          ? error.message
          : tl({
              th: "เกิดข้อผิดพลาดในการลงทะเบียน โปรดลองอีกครั้ง",
              en: "Registration failed. Please try again.",
              zh: "注册失败。请重试。"
            });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Field
        label={t("forms.firstName")}
        error={errors.firstName ? tl({ th: "กรุณากรอกชื่อ", en: "Please enter your first name.", zh: "请输入您的名字。" }) : undefined}
      >
        <input className="input-cyber" placeholder={t("forms.firstName")} {...register("firstName")} />
      </Field>
      <Field
        label={t("forms.lastName")}
        error={errors.lastName ? tl({ th: "กรุณากรอกนามสกุล", en: "Please enter your last name.", zh: "请输入您的姓氏。" }) : undefined}
      >
        <input className="input-cyber" placeholder={t("forms.lastName")} {...register("lastName")} />
      </Field>
      <Field
        label={t("forms.email")}
        error={errors.email ? tl({ th: "กรุณากรอกอีเมลที่ถูกต้อง", en: "Please enter a valid email.", zh: "请输入有效电子邮件。" }) : undefined}
      >
        <input className="input-cyber" type="email" placeholder="student@email.com" {...register("email")} />
      </Field>
      <Field
        label={t("forms.password")}
        error={errors.password ? tl({ th: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร", en: "Password must be at least 6 characters.", zh: "密码长度至少为 6 个字符。" }) : undefined}
      >
        <input className="input-cyber" type="password" placeholder="••••••••" {...register("password")} />
      </Field>
      <Field
        label={t("forms.school")}
        error={errors.school ? tl({ th: "กรุณากรอกชื่อโรงเรียน", en: "Please enter your school.", zh: "请输入您的学校。" }) : undefined}
      >
        <input className="input-cyber" placeholder={t("forms.school")} {...register("school")} />
      </Field>
      <Field
        label={t("forms.educationLevel")}
        error={errors.educationLevel ? tl({ th: "กรุณาเลือกระดับการศึกษา", en: "Please select your education level.", zh: "请选择您的教育程度。" }) : undefined}
      >
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
