"use client";

import type HCaptcha from "@hcaptcha/react-hcaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { signIn } from "@/app/(auth)/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Captcha from "./captcha";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email nie może być pusty" })
    .email("Nieprawidłowy adres email"),
  password: z.string(),
  token: z.string().min(1, { message: "Weryfikacja hCaptcha jest wymagana" }),
});

const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string;

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const captchaRef = useRef<HCaptcha | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleCaptchaChange = (token: string) => {
    setValue("token", token, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        const { error } = await signIn(data);
        if (error) {
          toast.error("Błędne dane logowania");
          setLoading(false);
        } else {
          toast.success("Zalogowano");
        }
        captchaRef.current?.resetCaptcha();
      })}
      className="flex flex-col gap-2"
    >
      <label htmlFor="email">Email</label>
      <Input id="email" type="email" {...register("email")} />
      <p className="text-red-500 min-h-[24px]">
        {errors.email?.message as React.ReactNode}
      </p>
      <label htmlFor="password">Hasło</label>
      <Input id="password" type="password" {...register("password")} />
      <Link href="/password-recovery" className="text-accent">
        Nie pamiętam hasła
      </Link>
      <div className="flex justify-center items-center min-h-[78px] py-6">
        <Captcha handleCaptchaChange={handleCaptchaChange} captchaRef={captchaRef} />
      </div>
      <input type="hidden" {...register("token")} />
      <p className="text-red-500 min-h-[48px]">
        {errors.token?.message as React.ReactNode}
      </p>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading && <LoaderIcon className="animate-spin" />}
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </form>
  );
}
