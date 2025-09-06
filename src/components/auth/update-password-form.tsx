"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { updatePassword } from "@/app/(auth)/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Hasło musi się składać z minimum 8 znaków" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Hasła nie są identyczne",
    path: ["confirmPassword"],
  });

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const error = await updatePassword(data);
        if (error) {
          toast.error(`Wystąpił błąd w trakcie zmiany hasła: ${error}`);
        }
      })}
      className="flex flex-col grow justify-center gap-2"
    >
      <label htmlFor="newPassword">Nowe hasło</label>
      <Input id="newPassword" type="password" {...register("newPassword")} />
      <p className="text-red-500 min-h-[24px]">
        {errors.newPassword?.message as React.ReactNode}
      </p>
      <label htmlFor="confirmPassword">Potwierdź nowe hasło</label>
      <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
      <p className="text-red-500 min-h-[24px]">
        {errors.confirmPassword?.message as React.ReactNode}
      </p>
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting && <LoaderIcon className="animate-spin" />}
        {isSubmitting ? "Przetwarzanie..." : "Zmień hasło"}
      </Button>
      <p className="text-muted">
        Po pomyślnej zmianie hasła nastąpi przekierowanie na stronę logowania
      </p>
    </form>
  );
}
