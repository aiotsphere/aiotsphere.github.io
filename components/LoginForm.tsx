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
import { createClient } from "@/lib/supabase/browser";

const schema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน")
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectedFrom") ?? "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      toast.success("เข้าสู่ระบบสำเร็จ");
      window.location.href = redirect;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white">Email</span>
        <input className="input-cyber" type="email" placeholder="student@email.com" {...register("email")} />
        {errors.email ? <span className="mt-2 block text-xs text-fuchsia-300">{errors.email.message}</span> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white">Password</span>
        <input className="input-cyber" type="password" placeholder="รหัสผ่าน" {...register("password")} />
        {errors.password ? <span className="mt-2 block text-xs text-fuchsia-300">{errors.password.message}</span> : null}
      </label>
      <CyberButton type="submit" className="w-full py-4" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
        เข้าสู่ระบบ
      </CyberButton>
      <p className="text-center text-sm text-silver">
        ยังไม่มีบัญชี? <Link href="/register" className="font-bold text-cyan">สมัครเข้าร่วม</Link>
      </p>
    </form>
  );
}
