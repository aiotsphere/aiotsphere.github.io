"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CyberButton } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/browser";
import { tracks } from "@/lib/types";

const schema = z.object({
  firstName: z.string().min(2, "กรุณากรอกชื่อ"),
  lastName: z.string().min(2, "กรุณากรอกนามสกุล"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  school: z.string().min(2, "กรุณากรอกชื่อโรงเรียน"),
  educationLevel: z.string().min(1, "กรุณาเลือกระดับชั้น"),
  interestedTrack: z.string().min(1, "กรุณาเลือกแทร็ก")
});

type RegisterValues = z.infer<typeof schema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: { interestedTrack: "ai-builder", educationLevel: "ม.ปลาย" }
  });

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from("registrations").insert({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        school: values.school,
        education_level: values.educationLevel,
        interested_track: values.interestedTrack,
        status: "pending"
      });

      if (insertError) throw insertError;
      toast.success("สมัครสำเร็จ เราได้รับข้อมูลของคุณแล้ว");
      window.location.href = "/";
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : "สมัครไม่สำเร็จ";
      const message =
        rawMessage.toLowerCase().includes("duplicate") ||
        rawMessage.toLowerCase().includes("registrations_email_key")
          ? "อีเมลนี้เคยสมัครแล้ว กรุณาใช้อีเมลอื่น"
          : rawMessage.toLowerCase().includes("row-level security")
            ? "ยังไม่ได้อัปเดต policy ใน Supabase กรุณารัน schema.sql เวอร์ชันล่าสุด"
            : rawMessage.toLowerCase().includes("rate limit") ||
                rawMessage.toLowerCase().includes("too many requests")
              ? "ระบบสมัครถูกจำกัดชั่วคราวจาก Supabase กรุณารอประมาณ 1-2 นาทีแล้วลองใหม่อีกครั้ง"
              : rawMessage;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Field label="First Name" error={errors.firstName?.message}>
        <input className="input-cyber" placeholder="ชื่อ" {...register("firstName")} />
      </Field>
      <Field label="Last Name" error={errors.lastName?.message}>
        <input className="input-cyber" placeholder="นามสกุล" {...register("lastName")} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input className="input-cyber" type="email" placeholder="student@email.com" {...register("email")} />
      </Field>
      <Field label="School" error={errors.school?.message}>
        <input className="input-cyber" placeholder="ชื่อโรงเรียน / วิทยาลัย" {...register("school")} />
      </Field>
      <Field label="Education Level" error={errors.educationLevel?.message}>
        <select className="input-cyber" {...register("educationLevel")}>
          <option>ม.ปลาย</option>
          <option>ปวช.</option>
          <option>เทียบเท่า</option>
        </select>
      </Field>
      <Field label="Interested Track" error={errors.interestedTrack?.message}>
        <select className="input-cyber" {...register("interestedTrack")}>
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>{track.title}</option>
          ))}
        </select>
      </Field>
      <div className="md:col-span-2">
        <CyberButton type="submit" className="mt-2 w-full py-4" disabled={loading}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          สมัครเข้าร่วม
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
