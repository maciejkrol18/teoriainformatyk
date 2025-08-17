"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { checkIfAccountExists, signUp } from "@/app/(auth)/actions";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";
import type HCaptcha from "@hcaptcha/react-hcaptcha";
import Captcha from "./captcha";

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email nie może być pusty" })
      .email("Nieprawidłowy adres email"),
    password: z
      .string()
      .min(8, { message: "Hasło musi się składać z minimum 8 znaków" }),
    token: z.string().min(1, { message: "Weryfikacja hCaptcha jest wymagana" }),
  })
  .refine(
    async (data) => {
      const exists = await checkIfAccountExists(data.email);
      return !exists;
    },
    {
      message: "Konto z tym adresem email już istnieje",
      path: ["email"],
    }
  );

const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string;

export default function RegisterForm() {
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
        const { error } = await signUp(
          data,
          window ? `${window.location.origin}` : "http://localhost:3000"
        );
        if (error) {
          toast.error(`W trakcie rejestracji wystąpił błąd: ${error}`);
          setLoading(false);
        } else {
          toast.success("Zarejestrowano");
        }
        captchaRef.current?.resetCaptcha();
      })}
      className="w-full flex flex-col gap-2"
    >
      <label htmlFor="email">Email</label>
      <Input id="email" type="email" {...register("email")} />
      <p className="text-red-500 min-h-[24px]">
        {errors.email?.message as React.ReactNode}
      </p>
      <label htmlFor="password">Hasło</label>
      <Input id="password" type="password" {...register("password")} />
      <p className="text-red-500 min-h-[24px]">
        {errors.password?.message as React.ReactNode}
      </p>
      <div className="flex justify-center items-center min-h-[78px] py-6">
        <Captcha
          handleCaptchaChange={handleCaptchaChange}
          captchaRef={captchaRef}
        />
      </div>
      <input type="hidden" {...register("token")} />
      <p className="text-red-500 min-h-[48px]">
        {errors.token?.message as React.ReactNode}
      </p>
      <Button type="submit" variant="primary">
        {loading && <LoaderIcon className="animate-spin" />}
        {loading ? "Tworzenie konta..." : "Stwórz konto"}
      </Button>
    </form>
  );
}
